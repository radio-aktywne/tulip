import { Account, Profile, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

import dayjs from "../dayjs";
import {
  refreshTokens as internalRefreshTokens,
  InvalidTokenError,
} from "../lib/scorpion/refresh-tokens";
import { refreshDurationFactor } from "./constants";
import { TokensData, TranformTokenInput, TransformSessionInput } from "./types";

export function splitSecrets(secrets: string) {
  return secrets.split(",");
}

export function getDurationInSeconds(duration: string) {
  return dayjs.duration(duration).asSeconds();
}

export function transformProfile(profile: Profile) {
  return {
    custom: {
      subject: profile.sub!,
      traits: profile.traits,
    },
  } satisfies User;
}

function shouldRefreshTokens(token: JWT) {
  const now = dayjs.utc().unix();
  const expiration = token.custom.tokens.access.expiresAt;
  const duration = token.custom.tokens.access.expiresIn;

  return now > expiration - refreshDurationFactor * duration;
}

async function refreshTokens(token: JWT) {
  const now = dayjs.utc().unix();

  try {
    const { expiresIn, refreshToken } = await internalRefreshTokens({
      refreshToken: token.custom.tokens.refresh.token,
    });

    const expiresAt = now + expiresIn;

    return {
      access: {
        expiresAt: expiresAt,
        expiresIn: expiresIn,
      },
      id: token.custom.tokens.id,
      refresh: {
        token: refreshToken,
      },
    } satisfies TokensData;
  } catch (error) {
    if (error instanceof InvalidTokenError) return null;
    return token.custom.tokens;
  }
}

function createNewToken(
  account: Account,
  profile: Profile,
  token: Partial<JWT>,
  user: User,
) {
  return {
    ...token,
    custom: {
      tokens: {
        access: {
          expiresAt: account.expires_at!,
          expiresIn: account.expires_in!,
        },
        id: {
          issuer: profile.iss,
          sessionId: profile.sid,
          token: account.id_token!,
        },
        refresh: {
          token: account.refresh_token!,
        },
      },
      user: user.custom,
    },
  } satisfies JWT;
}

export async function transformToken({
  account,
  profile,
  token,
  trigger,
  user,
}: TranformTokenInput) {
  if (trigger === "signIn")
    return createNewToken(account!, profile!, token, user);

  if (!shouldRefreshTokens(token)) return token;

  const tokens = await refreshTokens(token);
  if (!tokens) return null;

  return {
    ...token,
    custom: {
      ...token.custom,
      tokens: tokens,
    },
  } satisfies JWT;
}

export function transformSession({ session, token }: TransformSessionInput) {
  return {
    ...session,
    custom: {
      user: {
        subject: token.custom.user.subject,
        traits: token.custom.user.traits,
      },
    },
  } satisfies Session;
}

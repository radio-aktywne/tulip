import createClient, { ClientOptions } from "openapi-fetch";
import "server-only";

import type { paths } from "./types";

const scheme = process.env.TULIP__BEAVER__HTTP__SCHEME || "http";
const host = process.env.TULIP__BEAVER__HTTP__HOST || "localhost";
const port = process.env.TULIP__BEAVER__HTTP__PORT ?? 10500;
const path = (process.env.TULIP__BEAVER__HTTP__PATH || "")
  // Ensure path starts with a slash
  .replace(/^(?!\/)(.*)$/, "/$1")
  // Remove trailing slashes
  .replace(/\/+$/, "");
const url = `${scheme}://${host}${port ? `:${port}` : ""}${path}`;

export const beaverConfig = {
  baseUrl: url,
} satisfies ClientOptions;

export const beaver = createClient<paths>(beaverConfig);

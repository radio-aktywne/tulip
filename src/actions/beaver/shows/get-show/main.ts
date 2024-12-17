"use server";

import { BeaverError } from "../../../../lib/beaver/errors";
import {
  getShow as internalGetShow,
  ShowNotFoundError,
} from "../../../../lib/beaver/shows/get-show";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { GetShowInput, GetShowOutput } from "./types";

export async function getShow(input: GetShowInput): Promise<GetShowOutput> {
  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    const { show } = await internalGetShow({
      id: parsed.data.id,
      include: parsed.data.include,
    });
    return { data: show };
  } catch (error) {
    if (error instanceof ShowNotFoundError) return { error: errors.notFound };
    if (error instanceof BeaverError) return { error: errors.generic };
    throw error;
  }
}

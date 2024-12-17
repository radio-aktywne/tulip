"use server";

import { BeaverError } from "../../../../lib/beaver/errors";
import {
  updateShow as internalUpdateShow,
  InvalidInputError,
  ShowNotFoundError,
} from "../../../../lib/beaver/shows/update-show";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { UpdateShowInput, UpdateShowOutput } from "./types";

export async function updateShow(
  input: UpdateShowInput,
): Promise<UpdateShowOutput> {
  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    const { show } = await internalUpdateShow({
      data: parsed.data.data,
      id: parsed.data.id,
    });
    return { data: show };
  } catch (error) {
    if (error instanceof InvalidInputError)
      return { error: errors.invalidInput };
    if (error instanceof ShowNotFoundError) return { error: errors.notFound };
    if (error instanceof BeaverError) return { error: errors.generic };
    throw error;
  }
}

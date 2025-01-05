"use server";

import { auth } from "../../../../auth";
import { BeaverError } from "../../../../lib/beaver/errors";
import {
  createShow as internalCreateShow,
  InvalidInputError,
} from "../../../../lib/beaver/shows/create-show";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { CreateShowInput, CreateShowOutput } from "./types";

export async function createShow(
  input: CreateShowInput,
): Promise<CreateShowOutput> {
  const session = await auth.auth();
  if (!session) return { error: errors.unauthorized };

  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    const { show } = await internalCreateShow({
      description: parsed.data.description,
      id: parsed.data.id,
      title: parsed.data.title,
    });
    return { data: show };
  } catch (error) {
    if (error instanceof InvalidInputError)
      return { error: errors.invalidInput };
    if (error instanceof BeaverError) return { error: errors.generic };
    throw error;
  }
}

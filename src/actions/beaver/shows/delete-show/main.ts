"use server";

import { auth } from "../../../../auth";
import { BeaverError } from "../../../../lib/beaver/errors";
import {
  deleteShow as internalDeleteShow,
  ShowNotFoundError,
} from "../../../../lib/beaver/shows/delete-show";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { DeleteShowInput, DeleteShowOutput } from "./types";

export async function deleteShow(
  input: DeleteShowInput,
): Promise<DeleteShowOutput> {
  const session = await auth.auth();
  if (!session) return { error: errors.unauthorized };

  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    await internalDeleteShow({ id: parsed.data.id });
    return {};
  } catch (error) {
    if (error instanceof ShowNotFoundError) return { error: errors.notFound };
    if (error instanceof BeaverError) return { error: errors.generic };
    throw error;
  }
}

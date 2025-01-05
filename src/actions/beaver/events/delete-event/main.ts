"use server";

import { auth } from "../../../../auth";
import { BeaverError } from "../../../../lib/beaver/errors";
import {
  EventNotFoundError,
  deleteEvent as internalDeleteEvent,
} from "../../../../lib/beaver/events/delete-event";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { DeleteEventInput, DeleteEventOutput } from "./types";

export async function deleteEvent(
  input: DeleteEventInput,
): Promise<DeleteEventOutput> {
  const session = await auth.auth();
  if (!session) return { error: errors.unauthorized };

  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    await internalDeleteEvent({ id: parsed.data.id });
    return {};
  } catch (error) {
    if (error instanceof EventNotFoundError) return { error: errors.notFound };
    if (error instanceof BeaverError) return { error: errors.generic };
    throw error;
  }
}

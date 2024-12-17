"use server";

import { BeaverError } from "../../../../lib/beaver/errors";
import {
  EventNotFoundError,
  updateEvent as internalUpdateEvent,
  InvalidInputError,
} from "../../../../lib/beaver/events/update-event";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { UpdateEventInput, UpdateEventOutput } from "./types";

export async function updateEvent(
  input: UpdateEventInput,
): Promise<UpdateEventOutput> {
  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    const { event } = await internalUpdateEvent({
      data: parsed.data.data,
      id: parsed.data.id,
    });
    return { data: event };
  } catch (error) {
    if (error instanceof InvalidInputError)
      return { error: errors.invalidInput };
    if (error instanceof EventNotFoundError) return { error: errors.notFound };
    if (error instanceof BeaverError) return { error: errors.generic };
    throw error;
  }
}

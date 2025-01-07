"use server";

import { getSession } from "../../../../lib/auth/get-session";
import { BeaverError } from "../../../../lib/beaver/errors";
import {
  createEvent as internalCreateEvent,
  InvalidInputError,
} from "../../../../lib/beaver/events/create-event";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { CreateEventInput, CreateEventOutput } from "./types";

export async function createEvent(
  input: CreateEventInput,
): Promise<CreateEventOutput> {
  const { session } = await getSession();
  if (!session) return { error: errors.unauthorized };

  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    const { event } = await internalCreateEvent({
      end: parsed.data.end,
      id: parsed.data.id,
      recurrence: parsed.data.recurrence,
      show: parsed.data.show,
      start: parsed.data.start,
      timezone: parsed.data.timezone,
      type: parsed.data.type,
    });
    return { data: event };
  } catch (error) {
    if (error instanceof InvalidInputError)
      return { error: errors.invalidInput };
    if (error instanceof BeaverError) return { error: errors.generic };
    throw error;
  }
}

"use server";

import { auth } from "../../../../auth";
import { BeaverError } from "../../../../lib/beaver/errors";
import {
  EventNotFoundError,
  getEvent as internalGetEvent,
} from "../../../../lib/beaver/events/get-event";
import { errors } from "./constants";
import { inputSchema } from "./schemas";
import { GetEventInput, GetEventOutput } from "./types";

export async function getEvent(input: GetEventInput): Promise<GetEventOutput> {
  const session = await auth.auth();
  if (!session) return { error: errors.unauthorized };

  const parsed = inputSchema.safeParse(input);
  if (!parsed.success) return { error: errors.invalidInput };

  try {
    const { event } = await internalGetEvent({
      id: parsed.data.id,
      include: parsed.data.include,
    });
    return { data: event };
  } catch (error) {
    if (error instanceof EventNotFoundError) return { error: errors.notFound };
    if (error instanceof BeaverError) return { error: errors.generic };
    throw error;
  }
}

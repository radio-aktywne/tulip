import "server-only";

import { beaver } from "../../../../services/beaver";
import { BeaverError } from "../../errors";
import { InvalidInputError } from "./errors";
import { CreateEventInput, CreateEventOutput } from "./types";

export async function createEvent({
  end,
  id,
  recurrence,
  show,
  start,
  timezone,
  type,
}: CreateEventInput): Promise<CreateEventOutput> {
  const { data, error, response } = await beaver.POST("/events", {
    body: {
      end: end,
      id: id,
      recurrence: recurrence,
      showId: show,
      start: start,
      timezone: timezone,
      type: type,
    },
  });

  if (error || !response.ok) {
    if (response.status === 400) throw new InvalidInputError();
    throw new BeaverError();
  }

  return { event: data };
}

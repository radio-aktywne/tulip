import "server-only";

import { beaver } from "../../../../services/beaver";
import { BeaverError } from "../../errors";
import { EventNotFoundError, InvalidInputError } from "./errors";
import { UpdateEventInput, UpdateEventOutput } from "./types";

export async function updateEvent({
  data: updateData,
  id,
}: UpdateEventInput): Promise<UpdateEventOutput> {
  const { data, error, response } = await beaver.PATCH("/events/{id}", {
    body: {
      end: updateData.end,
      id: updateData.id,
      recurrence: updateData.recurrence,
      show: updateData.show,
      start: updateData.start,
      timezone: updateData.timezone,
      type: updateData.type,
    },
    params: { path: { id: id } },
  });

  if (error || !response.ok) {
    if (response.status === 400) throw new InvalidInputError();
    if (response.status === 404) throw new EventNotFoundError();
    throw new BeaverError();
  }

  return { event: data };
}

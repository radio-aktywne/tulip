import "server-only";

import { beaver } from "../../../../services/beaver";
import { BeaverError } from "../../errors";
import { EventNotFoundError } from "./errors";
import { DeleteEventInput } from "./types";

export async function deleteEvent({ id }: DeleteEventInput): Promise<void> {
  const { error, response } = await beaver.DELETE("/events/{id}", {
    params: {
      path: { id: id },
    },
  });

  if (error || !response.ok) {
    if (response.status === 404) throw new EventNotFoundError();
    throw new BeaverError();
  }
}

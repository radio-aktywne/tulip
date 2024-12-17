import "server-only";

import { beaver } from "../../../../services/beaver";
import { BeaverError } from "../../errors";
import { InvalidInputError } from "./errors";
import { CreateShowInput, CreateShowOutput } from "./types";

export async function createShow({
  description,
  id,
  title,
}: CreateShowInput): Promise<CreateShowOutput> {
  const { data, error, response } = await beaver.POST("/shows", {
    body: {
      description: description,
      id: id,
      title: title,
    },
  });

  if (error || !response.ok) {
    if (response.status === 400) throw new InvalidInputError();
    throw new BeaverError();
  }

  return { show: data };
}

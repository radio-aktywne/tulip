import "server-only";

import { beaver } from "../../../../services/beaver";
import { BeaverError } from "../../errors";
import { InvalidInputError, ShowNotFoundError } from "./errors";
import { UpdateShowInput, UpdateShowOutput } from "./types";

export async function updateShow({
  data: updateData,
  id,
}: UpdateShowInput): Promise<UpdateShowOutput> {
  const { data, error, response } = await beaver.PATCH("/shows/{id}", {
    body: {
      description: updateData.description,
      id: updateData.id,
      title: updateData.title,
    },
    params: { path: { id: id } },
  });

  if (error || !response.ok) {
    if (response.status === 400) throw new InvalidInputError();
    if (response.status === 404) throw new ShowNotFoundError();
    throw new BeaverError();
  }

  return { show: data };
}

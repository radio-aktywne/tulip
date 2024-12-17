import "server-only";

import { beaver } from "../../../../services/beaver";
import { BeaverError } from "../../errors";
import { ShowNotFoundError } from "./errors";
import { DeleteShowInput } from "./types";

export async function deleteShow({ id }: DeleteShowInput): Promise<void> {
  const { error, response } = await beaver.DELETE("/shows/{id}", {
    params: {
      path: { id: id },
    },
  });

  if (error || !response.ok) {
    if (response.status === 404) throw new ShowNotFoundError();
    throw new BeaverError();
  }
}

"use server";

import { beaver } from "../../api";
import { UpdateShowProps } from "./types";

const genericErrorMessage = "Updating show failed.";
const badRequestErrorMessage = "Invalid data.";

export async function updateShow({ id, update }: UpdateShowProps) {
  try {
    const { data, error } = await beaver.PATCH("/shows/{id}", {
      params: { path: { id } },
      body: {
        id: update.id,
        title: update.title,
        description: update.description,
      },
    });

    if (error) {
      if (error.status_code === 400)
        return { data: undefined, error: badRequestErrorMessage };

      return { data: undefined, error: genericErrorMessage };
    }
    return { data, error: undefined };
  } catch (error) {
    return { data: undefined, error: genericErrorMessage };
  }
}

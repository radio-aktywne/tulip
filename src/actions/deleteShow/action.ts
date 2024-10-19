"use server";

import { beaver } from "../../api";
import { DeleteShowProps } from "./types";

const errorMessage = "Deleting show failed.";

export async function deleteShow({ id }: DeleteShowProps) {
  try {
    const { error } = await beaver.DELETE("/shows/{id}", {
      params: { path: { id } },
    });

    return { error: error ? errorMessage : undefined };
  } catch (error) {
    return { error: errorMessage };
  }
}

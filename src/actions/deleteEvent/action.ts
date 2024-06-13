"use server";

import { emishows } from "../../api";
import { DeleteEventProps } from "./types";

const errorMessage = "Deleting event failed.";

export async function deleteEvent({ id }: DeleteEventProps) {
  try {
    const { error } = await emishows.DELETE("/events/{id}", {
      params: { path: { id } },
    });

    return { error: error ? errorMessage : undefined };
  } catch (error) {
    return { error: errorMessage };
  }
}

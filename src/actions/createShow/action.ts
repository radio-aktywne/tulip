"use server";

import { emishows } from "../../api";
import { CreateShowProps } from "./types";

const genericErrorMessage = "Creating show failed.";
const badRequestErrorMessage = "Invalid data.";

export async function createShow({ id, title, description }: CreateShowProps) {
  try {
    const { data, error } = await emishows.POST("/shows", {
      body: { id, title, description },
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

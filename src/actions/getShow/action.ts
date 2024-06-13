"use server";

import { emishows } from "../../api";
import { GetShowProps } from "./types";

const errorMessage = "Getting show failed.";

export async function getShow({ id, include }: GetShowProps) {
  try {
    const { data, error } = await emishows.GET("/shows/{id}", {
      params: {
        path: { id },
        query: { include: include && JSON.stringify(include) },
      },
    });

    if (error) {
      if (error.status_code === 404)
        return { data: undefined, error: undefined };

      return { data: undefined, error: errorMessage };
    }
    return { data, error: undefined };
  } catch (error) {
    return { data: undefined, error: errorMessage };
  }
}

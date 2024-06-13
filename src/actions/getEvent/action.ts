"use server";

import { emishows } from "../../api";
import { GetEventProps } from "./types";

const errorMessage = "Getting event failed.";

export async function getEvent({ id, include }: GetEventProps) {
  try {
    const { data, error } = await emishows.GET("/events/{id}", {
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

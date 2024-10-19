"use server";

import { beaver } from "../../api";
import { GetShowsProps } from "./types";

const errorMessage = "Getting shows failed.";

export async function getShows({
  limit,
  offset,
  where,
  include,
  order,
}: GetShowsProps = {}) {
  try {
    const { data, error } = await beaver.GET("/shows", {
      params: {
        query: {
          limit: limit,
          offset: offset,
          where: where && JSON.stringify(where),
          include: include && JSON.stringify(include),
          order: order && JSON.stringify(order),
        },
      },
    });

    if (error) return { data: undefined, error: errorMessage };
    return { data, error: undefined };
  } catch (error) {
    return { data: undefined, error: errorMessage };
  }
}

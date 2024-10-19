"use server";

import { beaver } from "../../api";
import { GetEventsProps } from "./types";

const errorMessage = "Getting events failed.";

export async function getEvents({
  limit,
  offset,
  where,
  query,
  include,
  order,
}: GetEventsProps = {}) {
  try {
    const { data, error } = await beaver.GET("/events", {
      params: {
        query: {
          limit: limit,
          offset: offset,
          where: where && JSON.stringify(where),
          query: query && JSON.stringify(query),
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

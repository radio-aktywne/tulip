import { parseQueryParams } from "../../../../lib/urls/parse-query-params";
import { searchParamsSchema } from "./schemas";
import { EventListPageSearchParams } from "./types";

export function parseParams(params: EventListPageSearchParams) {
  return parseQueryParams({
    params: new URLSearchParams(params),
    schema: searchParamsSchema,
  });
}

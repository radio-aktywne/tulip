import { z } from "zod";

import { ParseQueryParamsInput, ParseQueryParamsOutput } from "./types";

export function parseQueryParams<T extends z.ZodTypeAny>({
  params,
  schema,
}: ParseQueryParamsInput<T>): ParseQueryParamsOutput<T> {
  const result = schema.safeParse(Object.fromEntries(params) ?? undefined);

  return result.success ? { data: result.data } : { error: result.error };
}

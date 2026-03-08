import * as z from "zod";

import {
  ShowsCreateRequestSchema,
  ShowsCreateResponseSchema,
} from "../../../../../../../../../apis/beaver/schemas";

export const Schemas = {
  Input: z.object({
    ...ShowsCreateRequestSchema.shape.query.unwrap().shape,
    data: ShowsCreateRequestSchema.shape.body,
  }),
  Output: ShowsCreateResponseSchema,
};

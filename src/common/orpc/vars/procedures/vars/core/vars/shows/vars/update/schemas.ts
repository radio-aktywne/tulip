import * as z from "zod";

import {
  ShowsIdUpdateRequestSchema,
  ShowsIdUpdateResponseSchema,
} from "../../../../../../../../../apis/beaver/schemas";

export const Schemas = {
  Input: z.object({
    ...ShowsIdUpdateRequestSchema.shape.path.shape,
    ...ShowsIdUpdateRequestSchema.shape.query.unwrap().shape,
    data: ShowsIdUpdateRequestSchema.shape.body,
  }),
  Output: ShowsIdUpdateResponseSchema,
};

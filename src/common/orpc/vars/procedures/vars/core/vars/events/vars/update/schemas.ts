import * as z from "zod";

import {
  EventsIdUpdateRequestSchema,
  EventsIdUpdateResponseSchema,
} from "../../../../../../../../../apis/beaver/schemas";

export const Schemas = {
  Input: z.object({
    ...EventsIdUpdateRequestSchema.shape.path.shape,
    ...EventsIdUpdateRequestSchema.shape.query.unwrap().shape,
    data: EventsIdUpdateRequestSchema.shape.body,
  }),
  Output: EventsIdUpdateResponseSchema,
};

import {
  EventsIdDeleteRequestSchema,
  EventsIdDeleteResponseSchema,
} from "../../../../../../../../../apis/beaver/schemas";

export const Schemas = {
  Input: EventsIdDeleteRequestSchema.shape.path,
  Output: EventsIdDeleteResponseSchema,
};

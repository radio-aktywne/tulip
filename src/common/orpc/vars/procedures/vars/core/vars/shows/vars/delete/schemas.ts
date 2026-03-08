import {
  ShowsIdDeleteRequestSchema,
  ShowsIdDeleteResponseSchema,
} from "../../../../../../../../../apis/beaver/schemas";

export const Schemas = {
  Input: ShowsIdDeleteRequestSchema.shape.path,
  Output: ShowsIdDeleteResponseSchema,
};

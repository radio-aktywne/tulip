import { z } from "zod";

export const searchParamsSchema = z.object({
  current: z.string().date().optional(),
});

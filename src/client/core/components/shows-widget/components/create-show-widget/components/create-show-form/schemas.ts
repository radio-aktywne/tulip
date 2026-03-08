import * as z from "zod";

export const Schemas = {
  Values: z.object({
    description: z.string(),
    title: z.string().min(1),
  }),
};

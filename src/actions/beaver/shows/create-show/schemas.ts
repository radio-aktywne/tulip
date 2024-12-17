import { z } from "zod";

export const inputSchema = z.object({
  description: z.string().nullable().optional(),
  id: z.string().optional(),
  title: z.string(),
});

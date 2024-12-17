import { z } from "zod";

export const inputSchema = z.object({
  data: z.object({
    end: z.string().optional(),
    id: z.string().optional(),
    recurrence: z
      .object({
        exclude: z.string().array().nullable().optional(),
        include: z.string().array().nullable().optional(),
        rule: z
          .object({
            byHours: z.number().array().nullable().optional(),
            byMinutes: z.number().array().nullable().optional(),
            byMonthdays: z.number().array().nullable().optional(),
            byMonths: z.number().array().nullable().optional(),
            bySeconds: z.number().array().nullable().optional(),
            bySetPositions: z.number().array().nullable().optional(),
            byWeekdays: z
              .object({
                day: z.enum([
                  "monday",
                  "tuesday",
                  "wednesday",
                  "thursday",
                  "friday",
                  "saturday",
                  "sunday",
                ]),
                occurrence: z.number().nullable().optional(),
              })
              .array()
              .nullable()
              .optional(),
            byWeeks: z.number().array().nullable().optional(),
            byYeardays: z.number().array().nullable().optional(),
            count: z.number().nullable().optional(),
            frequency: z.enum([
              "secondly",
              "minutely",
              "hourly",
              "daily",
              "weekly",
              "monthly",
              "yearly",
            ]),
            interval: z.number().nullable().optional(),
            until: z.string().nullable().optional(),
            weekStart: z
              .enum([
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
                "sunday",
              ])
              .nullable()
              .optional(),
          })
          .nullable()
          .optional(),
      })
      .optional()
      .nullable(),
    show: z.string().optional(),
    start: z.string().optional(),
    timezone: z.string().optional(),
    type: z.enum(["live", "replay", "prerecorded"]).optional(),
  }),
  id: z.string(),
});

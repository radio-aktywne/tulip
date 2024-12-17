export const defaultValues = {
  count: 1,
  end: undefined,
  ends: "never" as const,
  frequency: "weekly" as const,
  interval: 1,
  recurring: "no" as const,
  show: undefined,
  start: undefined,
  timezone: "Europe/Warsaw",
  type: "live" as const,
  until: undefined,
};

export const showsLimit = 1000;

export const staticChoiceValues = {
  ends: ["never", "after", "on"] as const,
  frequency: ["weekly", "daily", "monthly", "yearly"] as const,
  recurring: ["no", "yes"] as const,
  timezone: Intl.supportedValuesOf("timeZone"),
  type: ["live", "replay", "prerecorded"] as const,
};

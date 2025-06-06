export const staticChoiceValues = {
  ends: ["never", "after", "on"] as const,
  frequency: ["weekly", "daily", "monthly", "yearly"] as const,
  recurring: ["no", "yes"] as const,
  timezone: Intl.supportedValuesOf("timeZone"),
  type: ["live", "replay", "prerecorded"] as const,
};

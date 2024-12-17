import { msg, plural } from "@lingui/macro";

import { UseEventFormAllowedValues } from "../../../../../../hooks/forms/use-event-form";

export function getTypeLabel(value: UseEventFormAllowedValues["type"][number]) {
  switch (value) {
    case "live":
      return msg({ message: "Live" });
    case "prerecorded":
      return msg({ message: "Prerecorded" });
    case "replay":
      return msg({ message: "Replay" });
  }
}

export function getShowLabel(value: string) {
  return value;
}

export function getTimezoneLabel(value: string) {
  return value;
}

export function getRecurringLabel(
  value: UseEventFormAllowedValues["recurring"][number],
) {
  switch (value) {
    case "no":
      return msg({ message: "No" });
    case "yes":
      return msg({ message: "Yes" });
  }
}

export function getFrequencyLabel(
  value: UseEventFormAllowedValues["frequency"][number],
  interval: number,
) {
  switch (value) {
    case "daily":
      return msg({
        message: plural(interval, { one: "day", other: "days" }),
      });
    case "monthly":
      return msg({
        message: plural(interval, { one: "month", other: "months" }),
      });
    case "weekly":
      return msg({
        message: plural(interval, { one: "week", other: "weeks" }),
      });
    case "yearly":
      return msg({
        message: plural(interval, { one: "year", other: "years" }),
      });
  }
}

export function getEndsLabel(value: UseEventFormAllowedValues["ends"][number]) {
  switch (value) {
    case "after":
      return msg({ message: "After" });
    case "never":
      return msg({ message: "Never" });
    case "on":
      return msg({ message: "On" });
  }
}

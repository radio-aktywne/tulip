import { msg, plural } from "@lingui/core/macro";

import { UseListShowsSuccessState } from "../../../../../../hooks/beaver/shows/use-list-shows/types";
import { staticChoiceValues } from "./constants";

export function getTypeLabel(
  value: (typeof staticChoiceValues)["type"][number],
) {
  switch (value) {
    case "live":
      return msg({ message: "Live" });
    case "prerecorded":
      return msg({ message: "Prerecorded" });
    case "replay":
      return msg({ message: "Replay" });
  }
}

export function getShowLabel(
  show: UseListShowsSuccessState["data"]["shows"][number],
) {
  return show.title;
}

export function getTimezoneLabel(value: string) {
  return value;
}

export function getRecurringLabel(
  value: (typeof staticChoiceValues)["recurring"][number],
) {
  switch (value) {
    case "no":
      return msg({ message: "No" });
    case "yes":
      return msg({ message: "Yes" });
  }
}

export function getFrequencyLabel(
  value: (typeof staticChoiceValues)["frequency"][number],
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

export function getEndsLabel(
  value: (typeof staticChoiceValues)["ends"][number],
) {
  switch (value) {
    case "after":
      return msg({ message: "After" });
    case "never":
      return msg({ message: "Never" });
    case "on":
      return msg({ message: "On" });
  }
}

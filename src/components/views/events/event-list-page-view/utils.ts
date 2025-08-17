import { Dayjs } from "dayjs";

export function getEndOfWeek(now: Dayjs) {
  return getStartOfWeek(now).add(1, "week");
}

export function getStartOfWeek(now: Dayjs) {
  return now.local().startOf("week");
}

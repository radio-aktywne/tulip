import { Dayjs } from "dayjs";

export function getStartOfWeek(now: Dayjs) {
  return now.local().startOf("week");
}

export function getEndOfWeek(now: Dayjs) {
  return getStartOfWeek(now).add(1, "week");
}

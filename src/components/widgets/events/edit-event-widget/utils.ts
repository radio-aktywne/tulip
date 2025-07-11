import dayjs from "../../../../dayjs";
import { datetimeDataFormat } from "./constants";

export function formatDatetime(date: Date) {
  return dayjs.utc(date).format(datetimeDataFormat);
}

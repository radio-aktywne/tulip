import dayjs from "../../../../dayjs";

export const datetimeDataFormat = "YYYY-MM-DDTHH:mm:ss";

export const include = JSON.stringify({ show: true });

export const maxDifferenceBetweenTimezones = dayjs.duration(26, "hours");

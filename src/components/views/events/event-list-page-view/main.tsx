import dayjs from "../../../../dayjs";
import { listSchedules } from "../../../../lib/beaver/schedules/list-schedules";
import { EventListWidget } from "../../../widgets/events/event-list-widget";
import {
  datetimeDataFormat,
  include,
  maxDifferenceBetweenTimezones,
} from "./constants";
import { EventListPageViewInput } from "./types";
import { getEndOfWeek, getStartOfWeek } from "./utils";

export async function EventListPageView({
  current: inputCurrent,
}: EventListPageViewInput) {
  const current = inputCurrent ? dayjs(inputCurrent) : dayjs.utc();

  const props = {
    end: getEndOfWeek(current)
      .add(maxDifferenceBetweenTimezones)
      .utc()
      .format(datetimeDataFormat),
    include: include,
    start: getStartOfWeek(current)
      .subtract(maxDifferenceBetweenTimezones)
      .utc()
      .format(datetimeDataFormat),
  };

  const { schedules } = await listSchedules(props);

  return (
    <EventListWidget
      current={current.toISOString()}
      schedules={schedules}
      {...props}
    />
  );
}

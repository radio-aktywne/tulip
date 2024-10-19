"use server";

import { beaver } from "../../api";
import dayjs from "../../utils/dayjs";
import { CreateEventProps } from "./types";

const genericErrorMessage = "Creating event failed.";
const badRequestErrorMessage = "Invalid data.";

const datetimeFormat = "YYYY-MM-DDTHH:mm:ss";

export async function createEvent({
  id,
  show,
  type,
  start,
  end,
  timezone,
  recurrence,
}: CreateEventProps) {
  try {
    const { data, error } = await beaver.POST("/events", {
      body: {
        id,
        showId: show,
        type,
        start: dayjs.utc(start).format(datetimeFormat),
        end: dayjs.utc(end).format(datetimeFormat),
        timezone,
        recurrence:
          recurrence == null
            ? recurrence
            : {
                rule:
                  recurrence.rule == null
                    ? recurrence.rule
                    : {
                        frequency: recurrence.rule.frequency,
                        interval: recurrence.rule.interval,
                        count: recurrence.rule.count,
                        until:
                          recurrence.rule.until == null
                            ? recurrence.rule.until
                            : dayjs
                                .utc(recurrence.rule.until)
                                .format(datetimeFormat),
                      },
              },
      },
    });

    if (error) {
      if (error.status_code === 400)
        return { data: undefined, error: badRequestErrorMessage };

      return { data: undefined, error: genericErrorMessage };
    }
    return { data, error: undefined };
  } catch (error) {
    return { data: undefined, error: genericErrorMessage };
  }
}

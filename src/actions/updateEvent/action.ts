"use server";

import { beaver } from "../../api";
import dayjs from "../../utils/dayjs";
import { UpdateEventProps } from "./types";

const genericErrorMessage = "Updating event failed.";
const badRequestErrorMessage = "Invalid data.";

const datetimeFormat = "YYYY-MM-DDTHH:mm:ss";

export async function updateEvent({ id, update }: UpdateEventProps) {
  try {
    const { data, error } = await beaver.PATCH("/events/{id}", {
      params: { path: { id } },
      body: {
        id: update.id,
        showId: update.show,
        type: update.type,
        start: update.start && dayjs.utc(update.start).format(datetimeFormat),
        end: update.end && dayjs.utc(update.end).format(datetimeFormat),
        timezone: update.timezone,
        recurrence:
          update.recurrence == null
            ? update.recurrence
            : {
                rule:
                  update.recurrence.rule == null
                    ? update.recurrence.rule
                    : {
                        frequency: update.recurrence.rule.frequency,
                        interval: update.recurrence.rule.interval,
                        count: update.recurrence.rule.count,
                        until:
                          update.recurrence.rule.until == null
                            ? update.recurrence.rule.until
                            : dayjs
                                .utc(update.recurrence.rule.until)
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

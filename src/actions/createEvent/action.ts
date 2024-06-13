"use server";

import { emishows } from "../../api";
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
}: CreateEventProps) {
  try {
    const { data, error } = await emishows.POST("/events", {
      body: {
        id,
        showId: show,
        type,
        start: dayjs.utc(start).format(datetimeFormat),
        end: dayjs.utc(end).format(datetimeFormat),
        timezone,
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

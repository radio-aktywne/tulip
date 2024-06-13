"use server";

import { emishows } from "../../api";
import dayjs from "../../utils/dayjs";
import { UpdateEventProps } from "./types";

const genericErrorMessage = "Updating event failed.";
const badRequestErrorMessage = "Invalid data.";

const datetimeFormat = "YYYY-MM-DDTHH:mm:ss";

export async function updateEvent({ id, update }: UpdateEventProps) {
  try {
    const { data, error } = await emishows.PATCH("/events/{id}", {
      params: { path: { id } },
      body: {
        id: update.id,
        showId: update.show,
        type: update.type,
        start: update.start && dayjs.utc(update.start).format(datetimeFormat),
        end: update.end && dayjs.utc(update.end).format(datetimeFormat),
        timezone: update.timezone,
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

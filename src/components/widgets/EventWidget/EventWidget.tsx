"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { UpdateEventProps, deleteEvent, updateEvent } from "../../../actions";
import { labels } from "../../../config/labels";
import { useEvent, useToasts } from "../../../hooks";
import dayjs from "../../../utils/dayjs";
import { EventForm, EventFormData } from "./EventForm";
import { EventWidgetProps } from "./EventWidget.types";

export function EventWidget({ event: prefetchedEvent }: EventWidgetProps) {
  const router = useRouter();

  const { event: currentEvent, fetchEvent } = useEvent({
    id: prefetchedEvent.id,
    include: { show: prefetchedEvent.show != null },
  });
  const event = currentEvent ?? prefetchedEvent;

  const { success, error } = useToasts();

  const handleUpdate = useCallback(
    async (update: UpdateEventProps["update"]) => {
      const { data: updatedEvent, error: message } = await updateEvent({
        id: event.id,
        update,
      });

      if (message !== undefined) {
        error(labels.widgets.event.toasts.update.error(event.id));
        return message;
      }

      success(labels.widgets.event.toasts.update.success(event.id));

      await fetchEvent();

      if (updatedEvent.id === event.id) router.refresh();
      else router.push(`/events/${updatedEvent.id}`);
    },
    [event.id, error, success, fetchEvent, router],
  );

  const handleSave = useCallback(
    async (data: EventFormData) => {
      if (!data.type)
        return { type: labels.widgets.event.form.fields.type.errors.missing };

      if (
        data.type !== "live" &&
        data.type !== "replay" &&
        data.type !== "prerecorded"
      )
        return { type: labels.widgets.event.form.fields.type.errors.invalid };

      if (!data.show)
        return { show: labels.widgets.event.form.fields.show.errors.missing };

      if (!data.start)
        return { start: labels.widgets.event.form.fields.start.errors.missing };

      if (!data.end)
        return { end: labels.widgets.event.form.fields.end.errors.missing };

      if (!data.timezone)
        return {
          timezone: labels.widgets.event.form.fields.timezone.errors.missing,
        };

      const message = await handleUpdate({
        type: data.type,
        show: data.show,
        start: data.start,
        end: data.end,
        timezone: data.timezone,
      });

      return message
        ? {
            type: message,
            show: message,
            start: message,
            end: message,
            timezone: message,
          }
        : null;
    },
    [handleUpdate],
  );

  const handleDelete = useCallback(async () => {
    const { error: message } = await deleteEvent({ id: event.id });
    if (message) error(message);
    else {
      success(labels.widgets.event.toasts.delete.success(event.id));
      router.push("/events");
    }
  }, [event.id, error, success, router]);

  return (
    <EventForm
      values={{
        type: event.type,
        show: event.showId,
        start: dayjs.utc(event.start as string).toDate(),
        end: dayjs.utc(event.end as string).toDate(),
        timezone: event.timezone,
      }}
      labels={labels.widgets.event.form}
      onSave={handleSave}
      onDelete={handleDelete}
    />
  );
}

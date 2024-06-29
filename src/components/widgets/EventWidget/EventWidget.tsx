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
      if (data.type === undefined || data.type === "")
        return { type: labels.widgets.event.form.fields.type.errors.missing };

      if (
        data.type !== "live" &&
        data.type !== "replay" &&
        data.type !== "prerecorded"
      )
        return { type: labels.widgets.event.form.fields.type.errors.invalid };

      if (data.show === undefined || data.show === "")
        return { show: labels.widgets.event.form.fields.show.errors.missing };

      if (data.start === undefined)
        return { start: labels.widgets.event.form.fields.start.errors.missing };

      if (data.end === undefined)
        return { end: labels.widgets.event.form.fields.end.errors.missing };

      if (data.timezone === undefined || data.timezone === "")
        return {
          timezone: labels.widgets.event.form.fields.timezone.errors.missing,
        };

      if (data.recurring !== "no" && data.recurring !== "yes")
        return {
          recurring:
            labels.widgets.event.form.fields.recurrence.recurring.errors
              .invalid,
        };

      if (data.recurring === "yes") {
        if (data.interval === undefined)
          return {
            interval:
              labels.widgets.event.form.fields.recurrence.repeat.interval.errors
                .missing,
          };

        if (data.frequency === undefined || data.frequency === "")
          return {
            frequency:
              labels.widgets.event.form.fields.recurrence.repeat.frequency
                .errors.missing,
          };

        if (
          data.frequency !== "daily" &&
          data.frequency !== "weekly" &&
          data.frequency !== "monthly" &&
          data.frequency !== "yearly"
        )
          return {
            frequency:
              labels.widgets.event.form.fields.recurrence.repeat.frequency
                .errors.invalid,
          };

        if (data.ends === undefined || data.ends === "")
          return {
            ends: labels.widgets.event.form.fields.recurrence.ends.ends.errors
              .missing,
          };

        if (
          data.ends !== "never" &&
          data.ends !== "after" &&
          data.ends !== "on"
        )
          return {
            ends: labels.widgets.event.form.fields.recurrence.ends.ends.errors
              .invalid,
          };

        if (data.ends === "after") {
          if (data.count === undefined)
            return {
              count:
                labels.widgets.event.form.fields.recurrence.ends.count.count
                  .errors.missing,
            };
        }

        if (data.ends === "on") {
          if (data.until === undefined)
            return {
              until:
                labels.widgets.event.form.fields.recurrence.ends.until.errors
                  .missing,
            };
        }
      }

      const message = await handleUpdate({
        type: data.type,
        show: data.show,
        start: data.start,
        end: data.end,
        timezone: data.timezone,
        recurrence: {
          rule:
            data.recurring === "no"
              ? null
              : {
                  frequency: data.frequency as
                    | "daily"
                    | "weekly"
                    | "monthly"
                    | "yearly",
                  interval: data.interval,
                  count: data.ends === "after" ? data.count : null,
                  until: data.ends === "on" ? data.until : null,
                },
        },
      });

      return message
        ? {
            type: message,
            show: message,
            start: message,
            end: message,
            timezone: message,
            recurring: message,
            interval: message,
            frequency: message,
            ends: message,
            count: message,
            until: message,
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
        recurring: event.recurrence?.rule == null ? "no" : "yes",
        interval: event.recurrence?.rule?.interval ?? undefined,
        frequency: event.recurrence?.rule?.frequency,
        ends:
          event.recurrence?.rule?.count != null
            ? "after"
            : event.recurrence?.rule?.until != null
            ? "on"
            : "never",
        count: event.recurrence?.rule?.count ?? undefined,
        until:
          event.recurrence?.rule?.until != null
            ? dayjs.utc(event.recurrence?.rule?.until as string).toDate()
            : undefined,
      }}
      labels={labels.widgets.event.form}
      onSave={handleSave}
      onDelete={handleDelete}
    />
  );
}

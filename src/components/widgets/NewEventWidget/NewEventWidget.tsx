"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { CreateEventProps, createEvent } from "../../../actions";
import { labels } from "../../../config/labels";
import { useToasts } from "../../../hooks";
import { EventForm, EventFormData } from "./EventForm";
import { NewEventWidgetProps } from "./NewEventWidget.types";

export function NewEventWidget({}: NewEventWidgetProps) {
  const router = useRouter();

  const { success, error } = useToasts();

  const handleNormalizedCreate = useCallback(
    async (data: CreateEventProps) => {
      const { data: event, error: message } = await createEvent(data);

      if (message !== undefined) {
        error(labels.widgets.newEvent.toasts.create.error);
        return message;
      }

      success(labels.widgets.newEvent.toasts.create.success(event.id));
      router.push(`/events/${event.id}`);
    },
    [error, success, router],
  );

  const handleCreate = useCallback(
    async (data: EventFormData) => {
      if (!data.type)
        return {
          type: labels.widgets.newEvent.form.fields.type.errors.missing,
        };

      if (
        data.type !== "live" &&
        data.type !== "replay" &&
        data.type !== "prerecorded"
      )
        return {
          type: labels.widgets.newEvent.form.fields.type.errors.invalid,
        };

      if (!data.show)
        return {
          show: labels.widgets.newEvent.form.fields.show.errors.missing,
        };

      if (!data.start)
        return {
          start: labels.widgets.newEvent.form.fields.start.errors.missing,
        };

      if (!data.end)
        return {
          end: labels.widgets.newEvent.form.fields.end.errors.missing,
        };

      if (!data.timezone)
        return {
          timezone: labels.widgets.newEvent.form.fields.timezone.errors.missing,
        };

      const message = await handleNormalizedCreate({
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
    [handleNormalizedCreate],
  );

  return (
    <EventForm labels={labels.widgets.newEvent.form} onCreate={handleCreate} />
  );
}

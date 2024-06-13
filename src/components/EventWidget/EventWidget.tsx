"use client";

import { Button, Loader, Stack } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { validate as validateUUID } from "uuid";
import { UpdateEventProps, deleteEvent, updateEvent } from "../../actions";
import { labels } from "../../config/labels";
import { useEvent, useShows, useToasts } from "../../hooks";
import dayjs from "../../utils/dayjs";
import { EventWidgetProps } from "./EventWidget.types";
import { DatetimeField, SelectField, TextField } from "./fields";

const datetimeFormat = "LLL";

export function EventWidget({ event: prefetchedEvent }: EventWidgetProps) {
  const router = useRouter();

  const { event: currentEvent, fetchEvent } = useEvent({
    id: prefetchedEvent.id,
    include: { show: prefetchedEvent.show != null },
  });
  const event = currentEvent ?? prefetchedEvent;

  const { success, error } = useToasts();

  const { shows } = useShows({ limit: 1000 });

  const validateId = useCallback((value: string | undefined) => {
    if (!value) return labels.widgets.event.fields.id.errors.missing;

    if (!validateUUID(value))
      return labels.widgets.event.fields.id.errors.format;
  }, []);

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

      await fetchEvent();
      success(labels.widgets.event.toasts.update.success(event.id));

      if (updatedEvent.id !== event.id)
        router.push(`/events/${updatedEvent.id}`);
    },
    [event.id, fetchEvent, error, success, router],
  );

  const handleUpdateId = useCallback(
    async (id: string | undefined) => {
      if (!id) return labels.widgets.event.fields.id.errors.missing;

      return await handleUpdate({ id });
    },
    [handleUpdate],
  );

  const handleUpdateType = useCallback(
    async (type: string | undefined) => {
      if (!type) return labels.widgets.event.fields.type.errors.missing;

      if (type !== "live" && type !== "replay" && type !== "prerecorded")
        return labels.widgets.event.fields.type.errors.invalid;

      return await handleUpdate({ type });
    },
    [handleUpdate],
  );

  const handleUpdateShow = useCallback(
    async (show: string | undefined) => {
      if (!show) return labels.widgets.event.fields.show.errors.missing;

      return await handleUpdate({ show });
    },
    [handleUpdate],
  );

  const handleUpdateStart = useCallback(
    async (start: Date | undefined) => {
      if (!start) return labels.widgets.event.fields.start.errors.missing;

      return await handleUpdate({ start });
    },
    [handleUpdate],
  );

  const handleUpdateEnd = useCallback(
    async (end: Date | undefined) => {
      if (!end) return labels.widgets.event.fields.end.errors.missing;

      return await handleUpdate({ end });
    },
    [handleUpdate],
  );

  const handleUpdateTimezone = useCallback(
    async (timezone: string | undefined) => {
      if (!timezone) return labels.widgets.event.fields.timezone.errors.missing;

      return await handleUpdate({ timezone });
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

  if (shows === undefined) return <Loader />;

  const typeSelectData = [
    {
      value: "live",
      label: labels.widgets.event.fields.type.options.live,
    },
    {
      value: "replay",
      label: labels.widgets.event.fields.type.options.replay,
    },
    {
      value: "prerecorded",
      label: labels.widgets.event.fields.type.options.prerecorded,
    },
  ];

  const showSelectData = shows.shows.map((show) => ({
    value: show.id,
    label: labels.widgets.event.fields.show.option(show.id),
  }));

  const timezoneSelectData = Intl.supportedValuesOf("timeZone");

  return (
    <Stack>
      <TextField
        title={labels.widgets.event.fields.id.title}
        value={event.id}
        required={true}
        validate={validateId}
        onUpdate={handleUpdateId}
      />
      <SelectField
        title={labels.widgets.event.fields.type.title}
        value={event.type}
        format={(value) => {
          switch (value) {
            case "live":
              return labels.widgets.event.fields.type.options.live;
            case "replay":
              return labels.widgets.event.fields.type.options.replay;
            case "prerecorded":
              return labels.widgets.event.fields.type.options.prerecorded;
            default:
              return value;
          }
        }}
        data={typeSelectData}
        required={true}
        onUpdate={handleUpdateType}
      />
      <SelectField
        title={labels.widgets.event.fields.show.title}
        value={event.showId}
        data={showSelectData}
        required={true}
        onUpdate={handleUpdateShow}
      />
      <DatetimeField
        title={labels.widgets.event.fields.start.title}
        value={dayjs.utc(event.start as string).toDate()}
        format={datetimeFormat}
        required={true}
        onUpdate={handleUpdateStart}
      />
      <DatetimeField
        title={labels.widgets.event.fields.end.title}
        value={dayjs.utc(event.end as string).toDate()}
        format={datetimeFormat}
        required={true}
        onUpdate={handleUpdateEnd}
      />
      <SelectField
        title={labels.widgets.event.fields.timezone.title}
        value={event.timezone}
        data={timezoneSelectData}
        required={true}
        onUpdate={handleUpdateTimezone}
      />
      <Button color="red" onClick={handleDelete}>
        {labels.widgets.event.buttons.delete.label}
      </Button>
    </Stack>
  );
}

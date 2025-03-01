"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

import { deleteEvent } from "../../../../actions/beaver/events/delete-event";
import {
  updateEvent,
  UpdateEventInput,
} from "../../../../actions/beaver/events/update-event";
import dayjs from "../../../../dayjs";
import { useGetEvent } from "../../../../hooks/beaver/events/use-get-event";
import { useToasts } from "../../../../hooks/use-toasts";
import { EditEventForm, EditEventFormData } from "./components/edit-event-form";
import { EventWidgetInput } from "./types";
import { formatDatetime } from "./utils";

export function EventWidget({ event: prefetchedEvent }: EventWidgetInput) {
  const router = useRouter();

  const { _ } = useLingui();
  const toasts = useToasts();

  const { data: currentEvent, error } = useGetEvent({
    id: prefetchedEvent.id,
  });
  const event = currentEvent ?? prefetchedEvent;

  const initialData = {
    count: event.recurrence?.rule?.count ?? undefined,
    end: dayjs.utc(event.end).toDate(),
    ends:
      event.recurrence?.rule?.count != null
        ? ("after" as const)
        : event.recurrence?.rule?.until != null
          ? ("on" as const)
          : ("never" as const),
    frequency:
      event.recurrence?.rule?.frequency === "daily" ||
      event.recurrence?.rule?.frequency === "weekly" ||
      event.recurrence?.rule?.frequency === "monthly" ||
      event.recurrence?.rule?.frequency === "yearly"
        ? event.recurrence?.rule?.frequency
        : undefined,
    interval: event.recurrence?.rule?.interval ?? undefined,
    recurring:
      event.recurrence?.rule == null ? ("no" as const) : ("yes" as const),
    show: event.showId,
    start: dayjs.utc(event.start).toDate(),
    timezone: event.timezone,
    type: event.type,
    until:
      event.recurrence?.rule?.until != null
        ? dayjs.utc(event.recurrence.rule.until).toDate()
        : undefined,
  };

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  const handleSaveAfterValidation = useCallback(
    async (input: UpdateEventInput["data"]) => {
      const { error: updateError } = await updateEvent({
        data: input,
        id: event.id,
      });

      if (updateError) {
        const translated = _(updateError);
        toasts.error(translated);
        router.refresh();
        return { show: translated };
      }

      toasts.success(_(msg({ message: "Event updated successfully" })));
      router.refresh();
    },
    [_, event, router, toasts],
  );

  const handleSave = useCallback(
    async (data: EditEventFormData) => {
      if (!data.type) return { type: _(msg({ message: "Type is required" })) };

      if (!data.show) return { show: _(msg({ message: "Show is required" })) };

      if (!data.start)
        return { start: _(msg({ message: "Start is required" })) };

      if (!data.end) return { end: _(msg({ message: "End is required" })) };

      if (!data.timezone)
        return { timezone: _(msg({ message: "Timezone is required" })) };

      if (data.recurring === "yes") {
        if (data.interval === undefined)
          return { interval: _(msg({ message: "Interval is required" })) };

        if (!data.frequency)
          return { frequency: _(msg({ message: "Frequency is required" })) };

        if (!data.ends)
          return { ends: _(msg({ message: "Ends is required" })) };

        if (data.ends === "after" && data.count === undefined)
          return { count: _(msg({ message: "Count is required" })) };

        if (data.ends === "on" && !data.until)
          return { until: _(msg({ message: "Until is required" })) };
      }

      return handleSaveAfterValidation({
        end: formatDatetime(data.end),
        recurrence:
          data.recurring === "yes"
            ? {
                rule: {
                  count: data.ends === "after" ? data.count! : null,
                  frequency: data.frequency!,
                  interval: data.interval!,
                  until:
                    data.ends === "on" ? formatDatetime(data.until!) : null,
                },
              }
            : data.recurring === "no"
              ? null
              : undefined,
        show: data.show,
        start: formatDatetime(data.start),
        timezone: data.timezone,
        type: data.type,
      });
    },
    [_, handleSaveAfterValidation],
  );

  const handleDelete = useCallback(async () => {
    const { error: deleteError } = await deleteEvent({ id: event.id });

    if (deleteError) {
      toasts.error(_(deleteError));
      router.refresh();
    } else {
      toasts.success(_(msg({ message: "Event deleted successfully" })));
      router.push("/events");
    }
  }, [_, event, router, toasts]);

  return (
    <EditEventForm
      initialData={initialData}
      onDelete={handleDelete}
      onSave={handleSave}
    />
  );
}

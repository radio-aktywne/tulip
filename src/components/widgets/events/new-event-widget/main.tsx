"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Stack } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import {
  createEvent,
  CreateEventInput,
} from "../../../../actions/beaver/events/create-event";
import { useToasts } from "../../../../hooks/use-toasts";
import {
  CreateEventForm,
  CreateEventFormData,
} from "./components/create-event-form";
import { NewEventWidgetInput } from "./types";
import { formatDatetime } from "./utils";

export function NewEventWidget({ shows }: NewEventWidgetInput) {
  const router = useRouter();

  const { _ } = useLingui();
  const toasts = useToasts();

  const handleCreateAfterValidation = useCallback(
    async (input: CreateEventInput) => {
      const { error: createError } = await createEvent(input);

      if (createError) {
        const translated = _(createError);
        toasts.error(translated);
        router.refresh();
        return {
          count: translated,
          end: translated,
          ends: translated,
          frequency: translated,
          interval: translated,
          recurring: translated,
          show: translated,
          start: translated,
          timezone: translated,
          type: translated,
          until: translated,
        };
      }

      toasts.success(_(msg({ message: "Event created successfully" })));
      router.push(`/events`);
    },
    [_, router, toasts],
  );

  const handleCreate = useCallback(
    async (data: CreateEventFormData) => {
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

      return handleCreateAfterValidation({
        end: formatDatetime(data.end),
        recurrence:
          data.recurring === "yes"
            ? {
                rule: {
                  count: data.ends === "after" ? data.count! : undefined,
                  frequency: data.frequency!,
                  interval: data.interval!,
                  until:
                    data.ends === "on"
                      ? formatDatetime(data.until!)
                      : undefined,
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
    [_, handleCreateAfterValidation],
  );

  return (
    <Stack align="center">
      <CreateEventForm onCreate={handleCreate} shows={shows} />
    </Stack>
  );
}

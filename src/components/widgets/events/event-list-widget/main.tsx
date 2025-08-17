"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Box, Button, Stack } from "@mantine/core";
import { Calendar } from "@radio-aktywne/ui";
import Link from "next/link";
import { useEffect } from "react";

import dayjs from "../../../../dayjs";
import { useListSchedules } from "../../../../hooks/beaver/schedules/use-list-schedules";
import { useNow } from "../../../../hooks/use-now";
import { useToasts } from "../../../../hooks/use-toasts";
import { EventInstanceItem } from "./components/event-instance-item";
import { WeekSelector } from "./components/week-selector";
import { EventListWidgetInput } from "./types";

export function EventListWidget({
  current: inputCurrent,
  schedules: prefetchedSchedules,
  ...props
}: EventListWidgetInput) {
  const { _ } = useLingui();
  const toasts = useToasts();

  const current = dayjs(inputCurrent);
  const { now } = useNow({ interval: 1000 * 60 });

  const { data: currentSchedules, error, loading } = useListSchedules(props);
  const schedules = loading
    ? prefetchedSchedules
    : (currentSchedules ?? prefetchedSchedules);

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  return (
    <Stack align="center" h="100%" justify="space-between" w="100%">
      <WeekSelector current={current} />
      <Box style={{ overflow: "auto" }} w="100%">
        <Calendar current={current} now={now}>
          {schedules.schedules.flatMap((schedule, i) =>
            schedule.instances.map((instance, j) => (
              <EventInstanceItem
                current={current}
                event={schedule.event}
                instance={instance}
                key={`${i}-${j}`}
              />
            )),
          )}
        </Calendar>
      </Box>
      <Button
        component={Link}
        fullWidth
        href="/events/new"
        style={{ flexShrink: 0 }}
      >
        {_(msg({ message: "Add" }))}
      </Button>
    </Stack>
  );
}

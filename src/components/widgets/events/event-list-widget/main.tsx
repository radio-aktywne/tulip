"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Box, Button, Loader, Stack } from "@mantine/core";
import { Calendar, Center } from "@radio-aktywne/ui";
import Link from "next/link";
import { useEffect } from "react";

import dayjs from "../../../../dayjs";
import { useListSchedules } from "../../../../hooks/beaver/schedules/use-list-schedules";
import { useNow } from "../../../../hooks/use-now";
import { useToasts } from "../../../../hooks/use-toasts";
import { EventInstanceItem } from "./components/event-instance-item";
import { WeekSelector } from "./components/week-selector";
import { datetimeDataFormat, include } from "./constants";
import { EventListWidgetInput } from "./types";
import { getEndOfWeek, getStartOfWeek } from "./utils";

export function EventListWidget({
  current: inputCurrent,
}: EventListWidgetInput) {
  const { _ } = useLingui();
  const toasts = useToasts();

  const { now } = useNow({ interval: 1000 * 60 });
  const current = inputCurrent ? dayjs(inputCurrent) : now;

  const { data: schedules, error } = useListSchedules({
    end: getEndOfWeek(current).utc().format(datetimeDataFormat),
    include: include,
    start: getStartOfWeek(current).utc().format(datetimeDataFormat),
  });

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  return (
    <Stack align="center" h="100%" justify="space-between" w="100%">
      <WeekSelector current={current} />
      {schedules === undefined ? (
        <Center>
          <Loader />
        </Center>
      ) : (
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
      )}
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

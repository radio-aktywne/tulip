"use client";

import type { SetNonNullableDeep } from "type-fest";

import { msg } from "@lingui/core/macro";
import { Box, Button, Stack } from "@mantine/core";
import { Calendar } from "@radio-aktywne/ui";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useMemo } from "react";

import type { ListEventsWidgetInput } from "./types";

import { LoadingWidget } from "../../../../common/core/components/generic/loading-widget";
import { dayjs } from "../../../../common/dates/vars/dayjs";
import { useLocalization } from "../../../../isomorphic/localization/hooks/use-localization";
import { useNow } from "../../../generic/hooks/use-now";
import { orpcClientSideQueryClient } from "../../../orpc/vars/clients";
import { Controls } from "./components/controls";
import { EventInstanceItem } from "./components/event-instance-item";

export function ListEventsWidget({ date }: ListEventsWidgetInput) {
  const { timestamp } = useNow();

  const utcDate = useMemo(
    () => (date ? dayjs.utc(date, "YYYY-MM-DD") : dayjs.utc()),
    [date],
  );
  const utcNow = useMemo(() => dayjs.unix(timestamp).utc(), [timestamp]);

  const { localization } = useLocalization();

  const localDate = useMemo(
    () => utcDate.locale(localization.locale).local(),
    [localization.locale, utcDate],
  );

  const localNow = useMemo(
    () => utcNow.locale(localization.locale).local(),
    [localization.locale, utcNow],
  );

  const scheduleListInput = useMemo(
    () => ({
      end: utcDate
        .startOf("week")
        .add(1, "week")
        .add(1, "week")
        .add(26, "hours")
        .utc()
        .format("YYYY-MM-DDTHH:mm:ss"),
      include: { show: true },
      limit: null,
      start: utcDate
        .startOf("week")
        .subtract(1, "week")
        .subtract(26, "hours")
        .utc()
        .format("YYYY-MM-DDTHH:mm:ss"),
    }),
    [utcDate],
  );

  const scheduleListQuery = useQuery(
    orpcClientSideQueryClient.core.schedule.list.queryOptions({
      input: scheduleListInput,
    }),
  );

  return (
    <Stack align="center" h="100%" justify="space-between" w="100%">
      <Controls date={localDate} />
      <Box style={{ overflow: "auto" }} w="100%">
        {scheduleListQuery.data ? (
          <Calendar current={localDate} now={localNow}>
            {(
              scheduleListQuery.data as SetNonNullableDeep<
                typeof scheduleListQuery.data,
                "schedules.0.event.show"
              >
            ).schedules.flatMap((schedule, i) =>
              schedule.instances.map((instance, j) => (
                <EventInstanceItem
                  current={localDate}
                  event={schedule.event}
                  instance={instance}
                  key={`${i}-${j}`}
                />
              )),
            )}
          </Calendar>
        ) : (
          <LoadingWidget />
        )}
      </Box>
      <Button
        component={Link}
        fullWidth
        href="/events/new"
        style={{ flexShrink: 0 }}
      >
        {localization.localize(msg({ message: "Create" }))}
      </Button>
    </Stack>
  );
}

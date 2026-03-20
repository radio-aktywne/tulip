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
  const parsedDate = useMemo(
    () => (date ? dayjs(date, "YYYY-MM-DD") : dayjs()),
    [date],
  );

  const { localization } = useLocalization();
  const { timestamp } = useNow();

  const now = useMemo(
    () => dayjs.unix(timestamp).locale(localization.locale).local(),
    [localization.locale, timestamp],
  );

  const localDate = useMemo(
    () => parsedDate.locale(localization.locale).local(),
    [localization.locale, parsedDate],
  );

  const scheduleListInput = useMemo(
    () => ({
      end: localDate
        .startOf("week")
        .add(1, "week")
        .add(1, "week")
        .add(26, "hours")
        .utc()
        .format("YYYY-MM-DDTHH:mm:ss"),
      include: { show: true },
      limit: null,
      start: localDate
        .startOf("week")
        .subtract(1, "week")
        .subtract(26, "hours")
        .utc()
        .format("YYYY-MM-DDTHH:mm:ss"),
    }),
    [localDate],
  );

  const scheduleListQuery = useQuery(
    orpcClientSideQueryClient.core.schedule.list.queryOptions({
      input: scheduleListInput,
    }),
  );

  const scheduleList = scheduleListQuery.data as SetNonNullableDeep<
    typeof scheduleListQuery.data,
    "schedules.0.event.show"
  >;

  return (
    <Stack align="center" h="100%" justify="space-between" w="100%">
      <Controls date={localDate} />
      <Box style={{ overflow: "auto" }} w="100%">
        {scheduleList ? (
          <Calendar current={localDate} now={now}>
            {scheduleList.schedules.flatMap((schedule, i) =>
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

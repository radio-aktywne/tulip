import { Text, UnstyledButton } from "@mantine/core";
import { CalendarItem } from "@radio-aktywne/ui";
import Link from "next/link";

import type { EventInstanceItemInput } from "./types";

import { dayjs } from "../../../../../../common/dates/vars/dayjs";
import { constants } from "./constants";

export function EventInstanceItem({
  event,
  instance,
  ...input
}: EventInstanceItemInput) {
  return (
    <UnstyledButton
      component={Link}
      display="contents"
      href={`/events/${event.id}`}
    >
      <CalendarItem
        color={constants.colors[event.type]}
        end={dayjs.tz(instance.end, event.timezone)}
        start={dayjs.tz(instance.start, event.timezone)}
        {...input}
      >
        <Text fw="bold" size="xs" ta="center" truncate="end" w="100%">
          {event.show.title}
        </Text>
      </CalendarItem>
    </UnstyledButton>
  );
}

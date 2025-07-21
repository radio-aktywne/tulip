import { Text, UnstyledButton } from "@mantine/core";
import { CalendarItem } from "@radio-aktywne/ui";
import Link from "next/link";

import dayjs from "../../../../../../dayjs";
import { typeColors } from "./constants";
import { EventInstanceItemInput } from "./types";

export function EventInstanceItem({
  event,
  instance,
  ...props
}: EventInstanceItemInput) {
  return (
    <UnstyledButton
      component={Link}
      display="contents"
      href={`/events/${event.id}`}
    >
      <CalendarItem
        color={typeColors[event.type]}
        end={dayjs.tz(instance.end, event.timezone)}
        start={dayjs.tz(instance.start, event.timezone)}
        {...props}
      >
        <Text fw="bold" size="xs" ta="center" truncate="end" w="100%">
          {event.show!.title}
        </Text>
      </CalendarItem>
    </UnstyledButton>
  );
}

import { Text, UnstyledButton } from "@mantine/core";
import Link from "next/link";

import { EventItemInput } from "./types";

export function EventItem({ event }: EventItemInput) {
  return (
    <UnstyledButton component={Link} href={`/events/${event.id}`}>
      <Text fw="bold" size="xs">
        {event.id}
      </Text>
    </UnstyledButton>
  );
}

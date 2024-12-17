import { Group, Title, UnstyledButton } from "@mantine/core";
import Link from "next/link";

import { EventTileInput } from "./types";

export function EventTile({ event }: EventTileInput) {
  return (
    <UnstyledButton component={Link} href={`/events/${event.id}`}>
      <Group grow>
        <Title ta="center">{event.id}</Title>
      </Group>
    </UnstyledButton>
  );
}

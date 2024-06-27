import { Group, Title } from "@mantine/core";
import { EventTileProps } from "./EventTile.types";

export function EventTile({ event, labels }: EventTileProps) {
  return (
    <Group>
      <Title>{labels.text(event.id)}</Title>
    </Group>
  );
}

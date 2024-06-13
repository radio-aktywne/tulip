import { Group, Title } from "@mantine/core";
import { ShowTileProps } from "./ShowTile.types";

export function ShowTile({ show, labels }: ShowTileProps) {
  return (
    <Group>
      <Title>{labels.text(show.id)}</Title>
    </Group>
  );
}

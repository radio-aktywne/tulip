import { Group, Title, UnstyledButton } from "@mantine/core";
import Link from "next/link";

import { ShowTileInput } from "./types";

export function ShowTile({ show }: ShowTileInput) {
  return (
    <UnstyledButton component={Link} href={`/shows/${show.id}`}>
      <Group grow>
        <Title ta="center">{show.id}</Title>
      </Group>
    </UnstyledButton>
  );
}

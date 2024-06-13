"use client";

import { ActionIcon, Group, Stack, Title } from "@mantine/core";
import { IconEditCircle } from "@tabler/icons-react";
import { FieldDisplayProps } from "./FieldDisplay.types";

export function FieldDisplay<V>({
  title,
  value,
  render,
  onEdit,
}: FieldDisplayProps<V>) {
  return (
    <Stack>
      <Group justify="space-between">
        <Title>{title}</Title>
        <ActionIcon variant="transparent" onClick={onEdit}>
          <IconEditCircle />
        </ActionIcon>
      </Group>
      {render(value)}
    </Stack>
  );
}

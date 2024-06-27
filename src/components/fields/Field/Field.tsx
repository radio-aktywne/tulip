"use client";

import { Group, Stack, Title } from "@mantine/core";
import { FieldProps } from "./Field.types";

export function Field({ title, required, children }: FieldProps) {
  return (
    <Stack>
      <Group gap="xs">
        <Title>{title}</Title>
        {required && <Title c="red">*</Title>}
      </Group>
      {children}
    </Stack>
  );
}

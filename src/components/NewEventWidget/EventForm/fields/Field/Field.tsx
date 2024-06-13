"use client";

import { Group, Stack, Title } from "@mantine/core";
import { FieldProps } from "./Field.types";

export function Field<V>({ title, required, input, render }: FieldProps<V>) {
  return (
    <Stack>
      <Group gap="xs">
        <Title>{title}</Title>
        {required && <Title c="red">*</Title>}
      </Group>
      {render({ required: required, ...input })}
    </Stack>
  );
}

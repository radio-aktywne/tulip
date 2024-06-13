"use client";

import { ActionIcon, Group, Stack, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconCircleX, IconDeviceFloppy } from "@tabler/icons-react";
import { useCallback } from "react";
import { FieldEditProps } from "./FieldEdit.types";

export function FieldEdit<V>({
  title,
  value,
  required,
  render,
  validate,
  onSave,
  onCancel,
}: FieldEditProps<V>) {
  const validateValue = useCallback(
    (values: { value: V }) => {
      const error = validate?.(values.value);
      return { value: error };
    },
    [validate],
  );

  const form = useForm({
    initialValues: { value: value },
    validate: validateValue,
  });

  const formSetErrors = form.setErrors;

  const handleSubmit = useCallback(
    async (value: V) => {
      const error = await onSave?.(value);
      if (error != null) formSetErrors({ value: error });
    },
    [onSave, formSetErrors],
  );

  return (
    <form onSubmit={form.onSubmit(({ value }) => handleSubmit(value))}>
      <Stack>
        <Group justify="space-between">
          <Group gap="xs">
            <Title>{title}</Title>
            {required && <Title c="red">*</Title>}
          </Group>
          <Group>
            <ActionIcon variant="transparent" type="submit">
              <IconDeviceFloppy />
            </ActionIcon>
            <ActionIcon variant="transparent" onClick={onCancel}>
              <IconCircleX />
            </ActionIcon>
          </Group>
        </Group>
        {render({
          required: required,
          ...form.getInputProps("value"),
        })}
      </Stack>
    </form>
  );
}

"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button, Stack, TextInput } from "@mantine/core";
import { useCallback, useState } from "react";

import {
  useShowForm,
  UseShowFormValues,
} from "../../../../../../../../hooks/forms/use-show-form";
import { EditShowFormInput } from "./types";

export function EditShowForm({
  initialData,
  onSave,
  validate,
}: EditShowFormInput) {
  const [saving, setSaving] = useState(false);

  const { _ } = useLingui();

  const { form } = useShowForm({
    initialValues: initialData,
    validate: validate,
  });

  const formSetErrors = form.setErrors;

  const handleSave = useCallback(
    async (data: UseShowFormValues) => {
      setSaving(true);
      try {
        const errors = await onSave?.(data);
        if (errors) formSetErrors(errors);
      } finally {
        setSaving(false);
      }
    },
    [formSetErrors, onSave],
  );

  return (
    <form onSubmit={form.onSubmit(handleSave)}>
      <Stack>
        <TextInput
          label={_(msg({ message: "Title" }))}
          required={true}
          {...form.getInputProps("title")}
        />
        <TextInput
          label={_(msg({ message: "Description" }))}
          required={false}
          {...form.getInputProps("description")}
        />
        <Button loading={saving} type="submit">
          {_(msg({ message: "Save" }))}
        </Button>
      </Stack>
    </form>
  );
}

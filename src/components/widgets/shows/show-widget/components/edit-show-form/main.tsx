"use client";

import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Button, Loader, Stack, TextInput } from "@mantine/core";
import { useCallback, useState } from "react";

import {
  useShowForm,
  UseShowFormValues,
} from "../../../../../../hooks/forms/use-show-form";
import { EditShowFormInput } from "./types";

export function EditShowForm({
  initialData,
  onDelete,
  onSave,
  validate,
}: EditShowFormInput) {
  const [saving, setSaving] = useState(false);

  const { _ } = useLingui();

  const { form, loading } = useShowForm({
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

  if (loading) return <Loader />;

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
        <Button color="red" onClick={onDelete}>
          {_(msg({ message: "Delete" }))}
        </Button>
      </Stack>
    </form>
  );
}

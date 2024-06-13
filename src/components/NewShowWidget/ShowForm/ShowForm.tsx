"use client";

import { Button, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCallback } from "react";
import { ShowFormData, ShowFormProps } from "./ShowForm.types";
import { TextField, TextareaField } from "./fields";

export function ShowForm({ labels, validate, onCreate }: ShowFormProps) {
  const form = useForm({
    initialValues: { title: undefined, description: undefined },
    validate: validate,
  });

  const formSetErrors = form.setErrors;

  const handleCreate = useCallback(
    async (data: ShowFormData) => {
      const errors = await onCreate?.(data);
      if (errors != null) formSetErrors(errors);
    },
    [onCreate, formSetErrors],
  );

  return (
    <form onSubmit={form.onSubmit(handleCreate)}>
      <Stack>
        <TextField
          title={labels.fields.title.title}
          required={true}
          input={form.getInputProps("title")}
        />
        <TextareaField
          title={labels.fields.description.title}
          input={form.getInputProps("description")}
        />
        <Button type="submit">{labels.buttons.create.label}</Button>
      </Stack>
    </form>
  );
}

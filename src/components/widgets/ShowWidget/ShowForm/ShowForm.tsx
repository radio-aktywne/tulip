"use client";

import { Button, Stack } from "@mantine/core";
import { useCallback, useEffect } from "react";
import { useShowForm } from "../../../../hooks";
import { TextField } from "../../../fields/TextField";
import { TextareaField } from "../../../fields/TextareaField";
import { ShowFormData, ShowFormProps } from "./ShowForm.types";

export function ShowForm({
  values,
  labels,
  validate,
  onSave,
  onDelete,
}: ShowFormProps) {
  const { form, defaultValues } = useShowForm({
    initialValues: values,
    validate,
  });

  const formSetErrors = form.setErrors;

  const handleSave = useCallback(
    async (data: ShowFormData) => {
      const errors = await onSave?.(data);
      if (errors != null) formSetErrors(errors);
    },
    [onSave, formSetErrors],
  );

  const formIsDirty = form.isDirty;
  const formSetFieldValue = form.setFieldValue;
  const formSetInitialValues = form.setInitialValues;

  useEffect(() => {
    if (!formIsDirty("title"))
      formSetFieldValue("title", values.title ?? defaultValues.title);

    if (!formIsDirty("description"))
      formSetFieldValue(
        "description",
        values.description ?? defaultValues.description,
      );

    formSetInitialValues({
      title: values.title ?? defaultValues.title,
      description: values.description ?? defaultValues.description,
    });
  }, [
    values,
    formIsDirty,
    formSetFieldValue,
    formSetInitialValues,
    defaultValues.title,
    defaultValues.description,
  ]);

  return (
    <form onSubmit={form.onSubmit(handleSave)}>
      <Stack>
        <TextField
          title={labels.fields.title.title}
          required={true}
          {...form.getInputProps("title")}
        />
        <TextareaField
          title={labels.fields.description.title}
          {...form.getInputProps("description")}
        />
        <Button type="submit" disabled={!form.isDirty() || !form.isValid()}>
          {labels.buttons.save.label}
        </Button>
        <Button color="red" onClick={onDelete}>
          {labels.buttons.delete.label}
        </Button>
      </Stack>
    </form>
  );
}

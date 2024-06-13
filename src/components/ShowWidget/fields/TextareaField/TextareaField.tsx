"use client";

import { Text, Textarea } from "@mantine/core";
import { Field } from "../Field";
import { TextareaFieldProps } from "./TextareaField.types";

export function TextareaField({
  title,
  value,
  format,
  fallback,
  required,
  validate,
  onUpdate,
}: TextareaFieldProps) {
  return (
    <Field
      title={title}
      value={value}
      required={required}
      renderDisplay={(value) => (
        <Text c={value ? undefined : "dimmed"}>
          {value ? (format ? format(value) : value) : fallback}
        </Text>
      )}
      renderInput={(props) => <Textarea resize="vertical" {...props} />}
      validate={validate}
      onUpdate={onUpdate}
    />
  );
}

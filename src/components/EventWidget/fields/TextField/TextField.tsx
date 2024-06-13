"use client";

import { Text, TextInput } from "@mantine/core";
import { Field } from "../Field";
import { TextFieldProps } from "./TextField.types";

export function TextField({
  title,
  value,
  format,
  fallback,
  required,
  validate,
  onUpdate,
}: TextFieldProps) {
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
      renderInput={(props) => <TextInput {...props} />}
      validate={validate}
      onUpdate={onUpdate}
    />
  );
}

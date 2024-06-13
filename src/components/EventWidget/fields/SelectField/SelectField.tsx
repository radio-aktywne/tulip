"use client";

import { Select, Text } from "@mantine/core";
import { Field } from "../Field";
import { SelectFieldProps } from "./SelectField.types";

export function SelectField({
  title,
  value,
  format,
  data,
  fallback,
  required,
  validate,
  onUpdate,
}: SelectFieldProps) {
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
      renderInput={(props) => <Select data={data} {...props} />}
      validate={validate}
      onUpdate={onUpdate}
    />
  );
}

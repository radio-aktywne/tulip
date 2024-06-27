"use client";

import { Select } from "@mantine/core";
import { Field } from "../Field";
import { SelectFieldProps } from "./SelectField.types";

export function SelectField({ title, required, ...props }: SelectFieldProps) {
  return (
    <Field title={title} required={required}>
      <Select required={required} {...props} />
    </Field>
  );
}

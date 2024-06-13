"use client";

import { Select } from "@mantine/core";
import { Field } from "../Field";
import { SelectFieldProps } from "./SelectField.types";

export function SelectField({
  title,
  data,
  required,
  input,
}: SelectFieldProps) {
  return (
    <Field
      title={title}
      required={required}
      input={input}
      render={(props) => <Select data={data} {...props} />}
    />
  );
}

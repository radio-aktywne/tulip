"use client";

import { TextInput } from "@mantine/core";
import { Field } from "../Field";
import { TextFieldProps } from "./TextField.types";

export function TextField({ title, required, ...props }: TextFieldProps) {
  return (
    <Field title={title} required={required}>
      <TextInput required={required} {...props} />
    </Field>
  );
}

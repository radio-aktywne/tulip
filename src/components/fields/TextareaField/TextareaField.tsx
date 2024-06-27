"use client";

import { Textarea } from "@mantine/core";
import { Field } from "../Field";
import { TextareaFieldProps } from "./TextareaField.types";

export function TextareaField({
  title,
  required,
  ...props
}: TextareaFieldProps) {
  return (
    <Field title={title} required={required}>
      <Textarea resize="vertical" required={required} {...props} />
    </Field>
  );
}

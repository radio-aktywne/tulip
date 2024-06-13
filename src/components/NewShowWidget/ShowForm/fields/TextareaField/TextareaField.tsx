"use client";

import { Textarea } from "@mantine/core";
import { Field } from "../Field";
import { TextareaFieldProps } from "./TextareaField.types";

export function TextareaField({ title, required, input }: TextareaFieldProps) {
  return (
    <Field
      title={title}
      required={required}
      input={input}
      render={(props) => <Textarea resize="vertical" {...props} />}
    />
  );
}

"use client";

import { TextInput } from "@mantine/core";
import { Field } from "../Field";
import { TextFieldProps } from "./TextField.types";

export function TextField({ title, required, input }: TextFieldProps) {
  return (
    <Field
      title={title}
      required={required}
      input={input}
      render={(props) => <TextInput {...props} />}
    />
  );
}

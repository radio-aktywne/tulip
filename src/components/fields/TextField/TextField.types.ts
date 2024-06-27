import { TextInput } from "@mantine/core";
import { ComponentProps } from "react";

export type TextFieldProps = ComponentProps<typeof TextInput> & {
  title: string;
};

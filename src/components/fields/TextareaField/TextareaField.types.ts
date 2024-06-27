import { Textarea } from "@mantine/core";
import { ComponentProps } from "react";

export type TextareaFieldProps = ComponentProps<typeof Textarea> & {
  title: string;
};

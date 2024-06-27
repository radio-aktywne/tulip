import { Select } from "@mantine/core";
import { ComponentProps } from "react";

export type SelectFieldProps = ComponentProps<typeof Select> & {
  title: string;
};

import { DateTimePicker } from "@mantine/dates";
import { ComponentProps } from "react";

export type DatetimeFieldProps = ComponentProps<typeof DateTimePicker> & {
  title: string;
};

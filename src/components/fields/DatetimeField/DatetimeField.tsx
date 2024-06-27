"use client";

import { DateTimePicker, DatesProvider } from "@mantine/dates";
import { Field } from "../Field";
import { DatetimeFieldProps } from "./DatetimeField.types";

export function DatetimeField({
  title,
  required,
  ...props
}: DatetimeFieldProps) {
  return (
    <Field title={title} required={required}>
      <DatesProvider settings={{ consistentWeeks: true, timezone: "UTC" }}>
        <DateTimePicker dropdownType="modal" required={required} {...props} />
      </DatesProvider>
    </Field>
  );
}

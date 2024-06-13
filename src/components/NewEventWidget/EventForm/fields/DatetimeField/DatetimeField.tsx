"use client";

import { DateTimePicker, DatesProvider } from "@mantine/dates";
import { Field } from "../Field";
import { DatetimeFieldProps } from "./DatetimeField.types";

export function DatetimeField({
  title,
  format,
  required,
  input,
}: DatetimeFieldProps) {
  return (
    <Field
      title={title}
      required={required}
      input={input}
      render={(props) => (
        <DatesProvider settings={{ consistentWeeks: true, timezone: "UTC" }}>
          <DateTimePicker
            dropdownType="modal"
            valueFormat={format}
            {...props}
          />
        </DatesProvider>
      )}
    />
  );
}

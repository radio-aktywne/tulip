"use client";

import { Text } from "@mantine/core";
import { DateTimePicker, DatesProvider } from "@mantine/dates";
import dayjs from "dayjs";
import { Field } from "../Field";
import { DatetimeFieldProps } from "./DatetimeField.types";

export function DatetimeField({
  title,
  value,
  format,
  fallback,
  required,
  validate,
  onUpdate,
}: DatetimeFieldProps) {
  return (
    <Field
      title={title}
      value={value}
      required={required}
      renderDisplay={(value) => (
        <Text c={value ? undefined : "dimmed"}>
          {value ? dayjs.utc(value).format(format) : fallback}
        </Text>
      )}
      renderInput={(props) => (
        <DatesProvider settings={{ consistentWeeks: true, timezone: "UTC" }}>
          <DateTimePicker
            dropdownType="modal"
            valueFormat={format}
            {...props}
          />
        </DatesProvider>
      )}
      validate={validate}
      onUpdate={onUpdate}
    />
  );
}

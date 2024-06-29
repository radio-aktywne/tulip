import { NumberInput, Select } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { ComponentProps } from "react";

export type RecurrenceFieldLabels = {
  title: string;
  repeat: string;
  ends: string;
  count: string;
};

export type RecurrenceFieldValues = {
  recurring?: boolean;
  ends?: "never" | "after" | "on";
};

export type RecurrenceFieldInputs = {
  recurring?: ComponentProps<typeof Select>;
  interval?: ComponentProps<typeof NumberInput>;
  frequency?: ComponentProps<typeof Select>;
  ends?: ComponentProps<typeof Select>;
  count?: ComponentProps<typeof NumberInput>;
  until?: ComponentProps<typeof DateTimePicker>;
};

export type RecurrenceFieldProps = {
  labels: RecurrenceFieldLabels;
  required?: boolean;
  values?: RecurrenceFieldValues;
  inputs?: RecurrenceFieldInputs;
};

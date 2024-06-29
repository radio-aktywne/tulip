"use client";

import { Group, NumberInput, Select, Stack, Text } from "@mantine/core";
import { DateTimePicker, DatesProvider } from "@mantine/dates";
import { Field } from "../Field";
import { RecurrenceFieldProps } from "./RecurrenceField.types";

export function RecurrenceField({
  labels,
  required,
  values,
  inputs,
}: RecurrenceFieldProps) {
  return (
    <Field title={labels.title} required={required}>
      <Select required={required} {...inputs?.recurring} />
      {values?.recurring && (
        <Stack>
          <Text>{labels.repeat}</Text>
          <Group>
            <NumberInput
              required
              min={1}
              inputSize="5"
              style={{ flexGrow: 1 }}
              {...inputs?.interval}
            />
            <Select required style={{ flexGrow: 1 }} {...inputs?.frequency} />
          </Group>
          <Text>{labels.ends}</Text>
          <Group>
            <Select required style={{ flexGrow: 1 }} {...inputs?.ends} />
            {values?.ends === "after" && (
              <Group style={{ flexGrow: 1 }}>
                <NumberInput
                  required
                  min={1}
                  inputSize="5"
                  style={{ flexGrow: 1 }}
                  {...inputs?.count}
                />
                <Text>{labels.count}</Text>
              </Group>
            )}
            {values?.ends === "on" && (
              <DatesProvider
                settings={{ consistentWeeks: true, timezone: "UTC" }}
              >
                <DateTimePicker
                  required
                  dropdownType="modal"
                  style={{ flexGrow: 1 }}
                  {...inputs?.until}
                />
              </DatesProvider>
            )}
          </Group>
        </Stack>
      )}
    </Field>
  );
}

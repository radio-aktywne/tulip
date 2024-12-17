"use client";

import { msg, plural } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import {
  Button,
  Group,
  InputWrapper,
  Loader,
  NumberInput,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import { DatesProvider, DateTimePicker } from "@mantine/dates";
import { useCallback, useState } from "react";

import { datetimeDisplayFormat } from "../../../../../../constants";
import {
  useEventForm,
  UseEventFormValues,
} from "../../../../../../hooks/forms/use-event-form";
import { CreateEventFormInput } from "./types";
import {
  getEndsLabel,
  getFrequencyLabel,
  getRecurringLabel,
  getShowLabel,
  getTimezoneLabel,
  getTypeLabel,
} from "./utils";

export function CreateEventForm({ onCreate, validate }: CreateEventFormInput) {
  const [creating, setCreating] = useState(false);

  const { _ } = useLingui();

  const { allowedValues, form, loading } = useEventForm({
    validate: validate,
  });

  const formSetErrors = form.setErrors;

  const handleCreate = useCallback(
    async (data: UseEventFormValues) => {
      setCreating(true);
      try {
        const errors = await onCreate?.(data);
        if (errors) formSetErrors(errors);
      } finally {
        setCreating(false);
      }
    },
    [formSetErrors, onCreate],
  );

  if (loading) return <Loader />;

  const interval = form.getValues().interval ?? 0;
  const count = form.getValues().count ?? 0;

  const typeSelectData = allowedValues.type.map((value) => ({
    label: _(getTypeLabel(value)),
    value: value,
  }));

  const showSelectData = allowedValues.show.map((value) => ({
    label: _(getShowLabel(value)),
    value: value,
  }));

  const timezoneSelectData = allowedValues.timezone.map((value) => ({
    label: _(getTimezoneLabel(value)),
    value: value,
  }));

  const recurringSelectData = allowedValues.recurring.map((value) => ({
    label: _(getRecurringLabel(value)),
    value: value,
  }));

  const frequencySelectData = allowedValues.frequency.map((value) => ({
    label: _(getFrequencyLabel(value, interval)),
    value: value,
  }));

  const endsSelectData = allowedValues.ends.map((value) => ({
    label: _(getEndsLabel(value)),
    value: value,
  }));

  return (
    <form onSubmit={form.onSubmit(handleCreate)}>
      <DatesProvider settings={{ consistentWeeks: true, timezone: "UTC" }}>
        <Stack>
          <Select
            data={typeSelectData}
            label={_(msg({ message: "Type" }))}
            required={true}
            {...form.getInputProps("type")}
          />
          <Select
            data={showSelectData}
            label={_(msg({ message: "Show" }))}
            required={true}
            {...form.getInputProps("show")}
          />
          <DateTimePicker
            dropdownType="modal"
            label={_(msg({ message: "Start" }))}
            required={true}
            valueFormat={datetimeDisplayFormat}
            {...form.getInputProps("start")}
          />
          <DateTimePicker
            dropdownType="modal"
            label={_(msg({ message: "End" }))}
            required={true}
            valueFormat={datetimeDisplayFormat}
            {...form.getInputProps("end")}
          />
          <Select
            data={timezoneSelectData}
            label={_(msg({ message: "Timezone" }))}
            required={true}
            {...form.getInputProps("timezone")}
          />
          <Select
            data={recurringSelectData}
            label={_(msg({ message: "Recurring" }))}
            required={false}
            {...form.getInputProps("recurring")}
          />
          {form.getValues().recurring === "yes" && (
            <>
              <InputWrapper
                label={_(msg({ message: "Repeat every" }))}
                required={true}
              >
                <Group>
                  <NumberInput
                    inputSize="5"
                    min={1}
                    required={true}
                    style={{ flexGrow: 1 }}
                    {...form.getInputProps("interval")}
                  />
                  <Select
                    data={frequencySelectData}
                    required={true}
                    style={{ flexGrow: 1 }}
                    {...form.getInputProps("frequency")}
                  />
                </Group>
              </InputWrapper>
              <InputWrapper label={_(msg({ message: "Ends" }))} required={true}>
                <Group>
                  <Select
                    data={endsSelectData}
                    required={true}
                    style={{ flexGrow: 1 }}
                    {...form.getInputProps("ends")}
                  />
                  {form.getValues().ends === "after" && (
                    <Group style={{ flexGrow: 1 }}>
                      <NumberInput
                        inputSize="5"
                        min={1}
                        required={true}
                        style={{ flexGrow: 1 }}
                        {...form.getInputProps("count")}
                      />
                      <Text>
                        {_(
                          msg({
                            message: plural(count, {
                              one: "time",
                              other: "times",
                            }),
                          }),
                        )}
                      </Text>
                    </Group>
                  )}
                  {form.getValues().ends === "on" && (
                    <DateTimePicker
                      dropdownType="modal"
                      required={true}
                      style={{ flexGrow: 1 }}
                      valueFormat={datetimeDisplayFormat}
                      {...form.getInputProps("until")}
                    />
                  )}
                </Group>
              </InputWrapper>
            </>
          )}
          <Button loading={creating} type="submit">
            {_(msg({ message: "Create" }))}
          </Button>
        </Stack>
      </DatesProvider>
    </form>
  );
}

"use client";

import { msg, plural } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import {
  Button,
  Group,
  InputWrapper,
  NumberInput,
  Select,
  Stack,
  Text,
} from "@mantine/core";
import { DatesProvider, DateTimePicker } from "@mantine/dates";
import { useCallback, useState } from "react";

import {
  useEventForm,
  UseEventFormValues,
} from "../../../../../../hooks/forms/use-event-form";
import { datetimeDisplayFormat, staticChoiceValues } from "./constants";
import { EditEventFormInput } from "./types";
import {
  getEndsLabel,
  getFrequencyLabel,
  getRecurringLabel,
  getShowLabel,
  getTimezoneLabel,
  getTypeLabel,
} from "./utils";

export function EditEventForm({
  initialData,
  onSave,
  shows,
  validate,
}: EditEventFormInput) {
  const [saving, setSaving] = useState(false);

  const { _ } = useLingui();

  const { form } = useEventForm({
    initialValues: initialData,
    validate: validate,
  });

  const formSetErrors = form.setErrors;

  const handleSave = useCallback(
    async (data: UseEventFormValues) => {
      setSaving(true);
      try {
        const errors = await onSave?.(data);
        if (errors) formSetErrors(errors);
      } finally {
        setSaving(false);
      }
    },
    [formSetErrors, onSave],
  );

  const interval = form.getValues().interval ?? 0;
  const count = form.getValues().count ?? 0;

  const typeSelectData = staticChoiceValues.type.map((value) => ({
    label: _(getTypeLabel(value)),
    value: value,
  }));

  const showSelectData = shows?.shows.map((show) => ({
    label: getShowLabel(show),
    value: show.id,
  }));

  const timezoneSelectData = staticChoiceValues.timezone.map((value) => ({
    label: getTimezoneLabel(value),
    value: value,
  }));

  const recurringSelectData = staticChoiceValues.recurring.map((value) => ({
    label: _(getRecurringLabel(value)),
    value: value,
  }));

  const frequencySelectData = staticChoiceValues.frequency.map((value) => ({
    label: _(getFrequencyLabel(value, interval)),
    value: value,
  }));

  const endsSelectData = staticChoiceValues.ends.map((value) => ({
    label: _(getEndsLabel(value)),
    value: value,
  }));

  return (
    <form onSubmit={form.onSubmit(handleSave)}>
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
          <Button loading={saving} type="submit">
            {_(msg({ message: "Save" }))}
          </Button>
        </Stack>
      </DatesProvider>
    </form>
  );
}

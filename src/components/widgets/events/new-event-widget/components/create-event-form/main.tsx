"use client";

import { msg, plural } from "@lingui/core/macro";
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
import { useListShows } from "../../../../../../hooks/beaver/shows/use-list-shows";
import {
  useEventForm,
  UseEventFormValues,
} from "../../../../../../hooks/forms/use-event-form";
import { staticChoiceValues } from "./constants";
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

  const { data: shows, loading: showsLoading } = useListShows();

  const { form } = useEventForm({ validate: validate });

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

  if (showsLoading) return <Loader />;

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

"use client";

import { Button, Loader, Stack } from "@mantine/core";
import { useCallback } from "react";
import { defaultDatetimeFormat } from "../../../../config/constants";
import { useEventForm } from "../../../../hooks";
import { DatetimeField } from "../../../fields/DatetimeField";
import { RecurrenceField } from "../../../fields/RecurrenceField";
import { SelectField } from "../../../fields/SelectField";
import { EventFormData, EventFormProps } from "./EventForm.types";

export function EventForm({ labels, validate, onCreate }: EventFormProps) {
  const {
    form,
    typeValues,
    showValues,
    timezoneValues,
    recurringValues,
    frequencyValues,
    endsValues,
    loading,
  } = useEventForm({
    validate,
  });

  const formSetErrors = form.setErrors;

  const handleCreate = useCallback(
    async (data: EventFormData) => {
      const errors = await onCreate?.(data);
      if (errors != null) formSetErrors(errors);
    },
    [onCreate, formSetErrors],
  );

  const typeSelectData = typeValues.map((type) => ({
    value: type,
    label: labels.fields.type.options[type],
  }));

  const showSelectData = showValues.map((show) => ({
    value: show,
    label: labels.fields.show.option(show),
  }));

  const timezoneSelectData = timezoneValues;

  const recurringSelectData = recurringValues.map((recurring) => ({
    value: recurring,
    label: labels.fields.recurrence.recurring.options[recurring],
  }));

  const frequencySelectData = frequencyValues.map((frequency) => ({
    value: frequency,
    label:
      labels.fields.recurrence.repeat.frequency.options[frequency][
        form.getValues().interval === 1 ? "singular" : "plural"
      ],
  }));

  const endsSelectData = endsValues.map((ends) => ({
    value: ends,
    label: labels.fields.recurrence.ends.ends.options[ends],
  }));

  if (loading) return <Loader />;

  return (
    <form onSubmit={form.onSubmit(handleCreate)}>
      <Stack>
        <SelectField
          title={labels.fields.type.title}
          data={typeSelectData}
          required={true}
          {...form.getInputProps("type")}
        />
        <SelectField
          title={labels.fields.show.title}
          data={showSelectData}
          required={true}
          {...form.getInputProps("show")}
        />
        <DatetimeField
          title={labels.fields.start.title}
          valueFormat={defaultDatetimeFormat}
          required={true}
          {...form.getInputProps("start")}
        />
        <DatetimeField
          title={labels.fields.end.title}
          valueFormat={defaultDatetimeFormat}
          required={true}
          {...form.getInputProps("end")}
        />
        <SelectField
          title={labels.fields.timezone.title}
          data={timezoneSelectData}
          required={true}
          {...form.getInputProps("timezone")}
        />
        <RecurrenceField
          labels={{
            title: labels.fields.recurrence.title,
            repeat: labels.fields.recurrence.repeat.header,
            ends: labels.fields.recurrence.ends.header,
            count:
              labels.fields.recurrence.ends.count.text[
                form.getValues().count === 1 ? "singular" : "plural"
              ],
          }}
          required={false}
          values={{
            recurring: form.getValues().recurring === "yes",
            ends: form.getValues().ends as "never" | "after" | "on",
          }}
          inputs={{
            recurring: {
              data: recurringSelectData,
              ...form.getInputProps("recurring"),
            },
            interval: form.getInputProps("interval"),
            frequency: {
              data: frequencySelectData,
              ...form.getInputProps("frequency"),
            },
            ends: { data: endsSelectData, ...form.getInputProps("ends") },
            count: form.getInputProps("count"),
            until: {
              valueFormat: defaultDatetimeFormat,
              ...form.getInputProps("until"),
            },
          }}
        />
        <Button type="submit">{labels.buttons.create.label}</Button>
      </Stack>
    </form>
  );
}

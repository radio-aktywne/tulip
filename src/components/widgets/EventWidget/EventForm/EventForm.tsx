"use client";

import { Button, Loader, Stack } from "@mantine/core";
import { useCallback, useEffect } from "react";
import { defaultDatetimeFormat } from "../../../../config/constants";
import { useEventForm } from "../../../../hooks";
import { DatetimeField } from "../../../fields/DatetimeField";
import { RecurrenceField } from "../../../fields/RecurrenceField";
import { SelectField } from "../../../fields/SelectField";
import { EventFormData, EventFormProps } from "./EventForm.types";

export function EventForm({
  values,
  labels,
  validate,
  onSave,
  onDelete,
}: EventFormProps) {
  const {
    form,
    defaultValues,
    typeValues,
    showValues,
    timezoneValues,
    recurringValues,
    frequencyValues,
    endsValues,
    loading,
  } = useEventForm({
    initialValues: values,
    validate,
  });

  const formSetErrors = form.setErrors;

  const handleSave = useCallback(
    async (data: EventFormData) => {
      const errors = await onSave?.(data);
      if (errors != null) formSetErrors(errors);
    },
    [onSave, formSetErrors],
  );

  const formIsDirty = form.isDirty;
  const formSetFieldValue = form.setFieldValue;
  const formSetInitialValues = form.setInitialValues;

  useEffect(() => {
    if (!formIsDirty("type"))
      formSetFieldValue("type", values.type ?? defaultValues.type);

    if (!formIsDirty("show"))
      formSetFieldValue("show", values.show ?? defaultValues.show);

    if (!formIsDirty("start"))
      formSetFieldValue("start", values.start ?? defaultValues.start);

    if (!formIsDirty("end"))
      formSetFieldValue("end", values.end ?? defaultValues.end);

    if (!formIsDirty("timezone"))
      formSetFieldValue("timezone", values.timezone ?? defaultValues.timezone);

    if (!formIsDirty("recurring"))
      formSetFieldValue(
        "recurring",
        values.recurring ?? defaultValues.recurring,
      );

    if (!formIsDirty("interval"))
      formSetFieldValue("interval", values.interval ?? defaultValues.interval);

    if (!formIsDirty("frequency"))
      formSetFieldValue(
        "frequency",
        values.frequency ?? defaultValues.frequency,
      );

    if (!formIsDirty("ends"))
      formSetFieldValue("ends", values.ends ?? defaultValues.ends);

    if (!formIsDirty("count"))
      formSetFieldValue("count", values.count ?? defaultValues.count);

    if (!formIsDirty("until"))
      formSetFieldValue("until", values.until ?? defaultValues.until);

    formSetInitialValues({
      type: values.type ?? defaultValues.type,
      show: values.show ?? defaultValues.show,
      start: values.start ?? defaultValues.start,
      end: values.end ?? defaultValues.end,
      timezone: values.timezone ?? defaultValues.timezone,
      recurring: values.recurring ?? defaultValues.recurring,
      interval: values.interval ?? defaultValues.interval,
      frequency: values.frequency ?? defaultValues.frequency,
      ends: values.ends ?? defaultValues.ends,
      count: values.count ?? defaultValues.count,
      until: values.until ?? defaultValues.until,
    });
  }, [
    values,
    formIsDirty,
    formSetFieldValue,
    formSetInitialValues,
    defaultValues.type,
    defaultValues.show,
    defaultValues.start,
    defaultValues.end,
    defaultValues.timezone,
    defaultValues.recurring,
    defaultValues.interval,
    defaultValues.frequency,
    defaultValues.ends,
    defaultValues.count,
    defaultValues.until,
  ]);

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
    <form onSubmit={form.onSubmit(handleSave)}>
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
        <Button type="submit" disabled={!form.isDirty() || !form.isValid()}>
          {labels.buttons.save.label}
        </Button>
        <Button color="red" onClick={onDelete}>
          {labels.buttons.delete.label}
        </Button>
      </Stack>
    </form>
  );
}

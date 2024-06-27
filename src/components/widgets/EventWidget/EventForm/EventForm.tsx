"use client";

import { Button, Loader, Stack } from "@mantine/core";
import { useCallback, useEffect } from "react";
import { useEventForm } from "../../../../hooks";
import { DatetimeField } from "../../../fields/DatetimeField";
import { SelectField } from "../../../fields/SelectField";
import { EventFormData, EventFormProps } from "./EventForm.types";

const datetimeFormat = "LLL";

export function EventForm({
  values,
  labels,
  validate,
  onSave,
  onDelete,
}: EventFormProps) {
  const { form, typeValues, showValues, timezoneValues, loading } =
    useEventForm({
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
    if (!formIsDirty("type")) formSetFieldValue("type", values.type ?? "live");

    if (!formIsDirty("show")) formSetFieldValue("show", values.show);

    if (!formIsDirty("start")) formSetFieldValue("start", values.start);

    if (!formIsDirty("end")) formSetFieldValue("end", values.end);

    if (!formIsDirty("timezone"))
      formSetFieldValue("timezone", values.timezone ?? "Europe/Warsaw");

    formSetInitialValues({
      type: values.type ?? "live",
      show: values.show,
      start: values.start,
      end: values.end,
      timezone: values.timezone ?? "Europe/Warsaw",
    });
  }, [values, formIsDirty, formSetFieldValue, formSetInitialValues]);

  const typeSelectData = typeValues.map((type) => ({
    value: type,
    label: labels.fields.type.options[type],
  }));

  const showSelectData = showValues.map((show) => ({
    value: show,
    label: labels.fields.show.option(show),
  }));

  const timezoneSelectData = timezoneValues;

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
          valueFormat={datetimeFormat}
          required={true}
          {...form.getInputProps("start")}
        />
        <DatetimeField
          title={labels.fields.end.title}
          valueFormat={datetimeFormat}
          required={true}
          {...form.getInputProps("end")}
        />
        <SelectField
          title={labels.fields.timezone.title}
          data={timezoneSelectData}
          required={true}
          {...form.getInputProps("timezone")}
        />
        <Button type="submit">{labels.buttons.save.label}</Button>
        <Button color="red" onClick={onDelete}>
          {labels.buttons.delete.label}
        </Button>
      </Stack>
    </form>
  );
}

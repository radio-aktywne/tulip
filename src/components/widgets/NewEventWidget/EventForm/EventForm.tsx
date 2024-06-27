"use client";

import { Button, Loader, Stack } from "@mantine/core";
import { useCallback } from "react";
import { useEventForm } from "../../../../hooks";
import { DatetimeField } from "../../../fields/DatetimeField";
import { SelectField } from "../../../fields/SelectField";
import { EventFormData, EventFormProps } from "./EventForm.types";

const datetimeFormat = "LLL";

export function EventForm({ labels, validate, onCreate }: EventFormProps) {
  const { form, typeValues, showValues, timezoneValues, loading } =
    useEventForm({
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
        <Button type="submit">{labels.buttons.create.label}</Button>
      </Stack>
    </form>
  );
}

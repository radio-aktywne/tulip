"use client";

import { Button, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCallback } from "react";
import { EventFormData, EventFormProps } from "./EventForm.types";
import { DatetimeField, SelectField } from "./fields";

const datetimeFormat = "LLL";

export function EventForm({
  labels,
  shows,
  validate,
  onCreate,
}: EventFormProps) {
  const form = useForm({
    initialValues: {
      type: "live",
      show: undefined,
      start: undefined,
      end: undefined,
      timezone: "Europe/Warsaw",
    },
    validate: validate,
  });

  const formSetErrors = form.setErrors;

  const handleCreate = useCallback(
    async (data: EventFormData) => {
      const errors = await onCreate?.(data);
      if (errors != null) formSetErrors(errors);
    },
    [onCreate, formSetErrors],
  );

  const typeSelectData = [
    {
      value: "live",
      label: labels.fields.type.options.live,
    },
    {
      value: "replay",
      label: labels.fields.type.options.replay,
    },
    {
      value: "prerecorded",
      label: labels.fields.type.options.prerecorded,
    },
  ];

  const showSelectData = shows.map((show) => ({
    value: show.id,
    label: labels.fields.show.option(show.id),
  }));

  const timezoneSelectData = Intl.supportedValuesOf("timeZone");

  return (
    <form onSubmit={form.onSubmit(handleCreate)}>
      <Stack>
        <SelectField
          title={labels.fields.type.title}
          data={typeSelectData}
          required={true}
          input={form.getInputProps("type")}
        />
        <SelectField
          title={labels.fields.show.title}
          data={showSelectData}
          required={true}
          input={form.getInputProps("show")}
        />
        <DatetimeField
          title={labels.fields.start.title}
          format={datetimeFormat}
          required={true}
          input={form.getInputProps("start")}
        />
        <DatetimeField
          title={labels.fields.end.title}
          format={datetimeFormat}
          required={true}
          input={form.getInputProps("end")}
        />
        <SelectField
          title={labels.fields.timezone.title}
          data={timezoneSelectData}
          required={true}
          input={form.getInputProps("timezone")}
        />
        <Button type="submit">{labels.buttons.create.label}</Button>
      </Stack>
    </form>
  );
}

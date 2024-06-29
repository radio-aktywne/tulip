import "client-only";

import { useForm } from "@mantine/form";
import { useShows } from "../useShows";
import { UseEventFormProps } from "./useEventForm.types";

export function useEventForm({ initialValues, validate }: UseEventFormProps) {
  const defaultValues = {
    type: "live",
    show: undefined,
    start: undefined,
    end: undefined,
    timezone: "Europe/Warsaw",
    recurring: "no",
    interval: 1,
    frequency: "weekly",
    ends: "never",
    count: 1,
    until: undefined,
  };

  const form = useForm({
    initialValues: {
      type: initialValues?.type ?? defaultValues.type,
      show: initialValues?.show ?? defaultValues.show,
      start: initialValues?.start ?? defaultValues.start,
      end: initialValues?.end ?? defaultValues.end,
      timezone: initialValues?.timezone ?? defaultValues.timezone,
      recurring: initialValues?.recurring ?? defaultValues.recurring,
      interval: initialValues?.interval ?? defaultValues.interval,
      frequency: initialValues?.frequency ?? defaultValues.frequency,
      ends: initialValues?.ends ?? defaultValues.ends,
      count: initialValues?.count ?? defaultValues.count,
      until: initialValues?.until ?? defaultValues.until,
    },
    validate: validate,
  });

  const { shows } = useShows({ limit: 1000 });

  const typeValues = ["live", "replay", "prerecorded"] as const;
  const showValues = shows?.shows.map((show) => show.id) ?? [];
  const timezoneValues = Intl.supportedValuesOf("timeZone");
  const recurringValues = ["no", "yes"] as const;
  const frequencyValues = ["daily", "weekly", "monthly", "yearly"] as const;
  const endsValues = ["never", "after", "on"] as const;

  return {
    form,
    defaultValues,
    typeValues,
    showValues,
    timezoneValues,
    recurringValues,
    frequencyValues,
    endsValues,
    loading: shows === undefined,
  };
}

import { useForm } from "@mantine/form";
import "client-only";

import { defaultValues } from "./constants";
import {
  UseEventFormInput,
  UseEventFormOutput,
  UseEventFormValues,
} from "./types";

export function useEventForm({
  initialValues,
  validate,
}: UseEventFormInput): UseEventFormOutput {
  const form = useForm<UseEventFormValues>({
    initialValues: {
      count: initialValues?.count ?? defaultValues.count,
      end: initialValues?.end ?? defaultValues.end,
      ends: initialValues?.ends ?? defaultValues.ends,
      frequency: initialValues?.frequency ?? defaultValues.frequency,
      interval: initialValues?.interval ?? defaultValues.interval,
      recurring: initialValues?.recurring ?? defaultValues.recurring,
      show: initialValues?.show ?? defaultValues.show,
      start: initialValues?.start ?? defaultValues.start,
      timezone: initialValues?.timezone ?? defaultValues.timezone,
      type: initialValues?.type ?? defaultValues.type,
      until: initialValues?.until ?? defaultValues.until,
    },
    validate: validate,
  });

  return { defaultValues, form };
}

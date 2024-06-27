import "client-only";

import { useForm } from "@mantine/form";
import { useShows } from "../useShows";
import { UseEventFormProps } from "./useEventForm.types";

export function useEventForm({ initialValues, validate }: UseEventFormProps) {
  const form = useForm({
    initialValues: {
      type: initialValues?.type ?? "live",
      show: initialValues?.show,
      start: initialValues?.start,
      end: initialValues?.end,
      timezone: initialValues?.timezone ?? "Europe/Warsaw",
    },
    validate: validate,
  });

  const { shows } = useShows({ limit: 1000 });

  const typeValues = ["live", "replay", "prerecorded"] as const;
  const showValues = shows?.shows.map((show) => show.id) ?? [];
  const timezoneValues = Intl.supportedValuesOf("timeZone");

  return {
    form,
    typeValues,
    showValues,
    timezoneValues,
    loading: shows === undefined,
  };
}

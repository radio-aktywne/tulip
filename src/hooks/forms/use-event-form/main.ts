import { useForm } from "@mantine/form";
import "client-only";
import { useMemo } from "react";

import { useListShows } from "../../beaver/shows/use-list-shows";
import { defaultValues, showsLimit, staticChoiceValues } from "./constants";
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
      count:
        initialValues?.count === undefined
          ? defaultValues.count
          : initialValues.count,
      end:
        initialValues?.end === undefined
          ? defaultValues.end
          : initialValues.end,
      ends:
        initialValues?.ends === undefined
          ? defaultValues.ends
          : initialValues.ends,
      frequency:
        initialValues?.frequency === undefined
          ? defaultValues.frequency
          : initialValues.frequency,
      interval:
        initialValues?.interval === undefined
          ? defaultValues.interval
          : initialValues.interval,
      recurring:
        initialValues?.recurring === undefined
          ? defaultValues.recurring
          : initialValues.recurring,
      show:
        initialValues?.show === undefined
          ? defaultValues.show
          : initialValues.show,
      start:
        initialValues?.start === undefined
          ? defaultValues.start
          : initialValues.start,
      timezone:
        initialValues?.timezone === undefined
          ? defaultValues.timezone
          : initialValues.timezone,
      type:
        initialValues?.type === undefined
          ? defaultValues.type
          : initialValues.type,
      until:
        initialValues?.until === undefined
          ? defaultValues.until
          : initialValues.until,
    },
    validate: validate,
  });

  const { data: shows, loading: showsLoading } = useListShows({
    limit: showsLimit,
  });

  const allowedValues = useMemo(
    () => ({
      ends: staticChoiceValues.ends,
      frequency: staticChoiceValues.frequency,
      recurring: staticChoiceValues.recurring,
      show: shows?.shows.map((s) => s.id) ?? [],
      timezone: staticChoiceValues.timezone,
      type: staticChoiceValues.type,
    }),
    [shows],
  );

  return {
    allowedValues,
    defaultValues,
    form,
    loading: showsLoading,
  };
}

import { useForm } from "@mantine/form";
import "client-only";
import { useMemo } from "react";

import { defaultValues } from "./constants";
import {
  UseShowFormInput,
  UseShowFormOutput,
  UseShowFormValues,
} from "./types";

export function useShowForm({
  initialValues,
  validate,
}: UseShowFormInput): UseShowFormOutput {
  const form = useForm<UseShowFormValues>({
    initialValues: {
      description: initialValues?.description ?? defaultValues.description,
      title: initialValues?.title ?? defaultValues.title,
    },
    validate: validate,
  });

  const allowedValues = useMemo(() => ({}), []);

  return {
    allowedValues,
    defaultValues,
    form,
    loading: false,
  };
}

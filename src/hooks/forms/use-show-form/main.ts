import { useForm } from "@mantine/form";
import "client-only";

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

  return { defaultValues, form };
}

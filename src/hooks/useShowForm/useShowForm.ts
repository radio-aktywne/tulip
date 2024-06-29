import "client-only";

import { useForm } from "@mantine/form";
import { UseShowFormProps } from "./useShowForm.types";

export function useShowForm({ initialValues, validate }: UseShowFormProps) {
  const defaultValues = {
    title: undefined,
    description: undefined,
  };

  const form = useForm({
    initialValues: {
      title: initialValues?.title ?? defaultValues.title,
      description: initialValues?.description ?? defaultValues.description,
    },
    validate: validate,
  });

  return { form, defaultValues };
}

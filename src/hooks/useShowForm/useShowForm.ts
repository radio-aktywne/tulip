import "client-only";

import { useForm } from "@mantine/form";
import { UseShowFormProps } from "./useShowForm.types";

export function useShowForm({ initialValues, validate }: UseShowFormProps) {
  const form = useForm({
    initialValues: {
      title: initialValues?.title,
      description: initialValues?.description,
    },
    validate: validate,
  });

  return { form };
}

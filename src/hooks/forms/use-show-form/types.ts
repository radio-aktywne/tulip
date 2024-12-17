import { UseFormReturnType } from "@mantine/form";

export type UseShowFormAllowedValues = {
  [key: string]: never;
};

export type UseShowFormValues = {
  description: string | undefined;
  title: string | undefined;
};

export type UseShowFormInitialValues = Partial<UseShowFormValues>;

export type UseShowFormValidators = {
  [K in keyof UseShowFormValues]?: (
    value: UseShowFormValues[K],
  ) => null | string | undefined;
};

export type UseShowFormDefaultValues = Partial<UseShowFormValues>;

export type UseShowFormInput = {
  initialValues?: UseShowFormInitialValues;
  validate?: UseShowFormValidators;
};

export type UseShowFormOutput = {
  allowedValues: UseShowFormAllowedValues;
  defaultValues: UseShowFormDefaultValues;
  form: UseFormReturnType<UseShowFormValues>;
  loading: boolean;
};

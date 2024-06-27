export type UseShowFormInitialValues = {
  title?: string;
  description?: string;
};

export type UseShowFormValidators = {
  title?: (value: string | undefined) => string | null | undefined;
  description?: (value: string | undefined) => string | null | undefined;
};

export type UseShowFormProps = {
  initialValues?: UseShowFormInitialValues;
  validate?: UseShowFormValidators;
};

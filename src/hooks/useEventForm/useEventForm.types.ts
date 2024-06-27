export type UseEventFormInitialValues = {
  type?: string;
  show?: string;
  start?: Date;
  end?: Date;
  timezone?: string;
};

export type UseEventFormValidators = {
  type?: (value: string | undefined) => string | null | undefined;
  show?: (value: string | undefined) => string | null | undefined;
  start?: (value: Date | undefined) => string | null | undefined;
  end?: (value: Date | undefined) => string | null | undefined;
  timezone?: (value: string | undefined) => string | null | undefined;
};

export type UseEventFormProps = {
  initialValues?: UseEventFormInitialValues;
  validate?: UseEventFormValidators;
};

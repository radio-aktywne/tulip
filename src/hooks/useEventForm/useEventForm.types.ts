export type UseEventFormInitialValues = {
  type?: string;
  show?: string;
  start?: Date;
  end?: Date;
  timezone?: string;
  recurring?: string;
  interval?: number;
  frequency?: string;
  ends?: string;
  count?: number;
  until?: Date;
};

export type UseEventFormValidators = {
  type?: (value: string | undefined) => string | null | undefined;
  show?: (value: string | undefined) => string | null | undefined;
  start?: (value: Date | undefined) => string | null | undefined;
  end?: (value: Date | undefined) => string | null | undefined;
  timezone?: (value: string | undefined) => string | null | undefined;
  recurring?: (value: string | undefined) => string | null | undefined;
  interval?: (value: number | undefined) => string | null | undefined;
  frequency?: (value: string | undefined) => string | null | undefined;
  ends?: (value: string | undefined) => string | null | undefined;
  count?: (value: number | undefined) => string | null | undefined;
  until?: (value: Date | undefined) => string | null | undefined;
};

export type UseEventFormProps = {
  initialValues?: UseEventFormInitialValues;
  validate?: UseEventFormValidators;
};

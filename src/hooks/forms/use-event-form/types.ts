import { UseFormReturnType } from "@mantine/form";

export type UseEventFormValues = {
  count: number | undefined;
  end: Date | undefined;
  ends: "after" | "never" | "on" | undefined;
  frequency: "daily" | "monthly" | "weekly" | "yearly" | undefined;
  interval: number | undefined;
  recurring: "no" | "yes" | undefined;
  show: string | undefined;
  start: Date | undefined;
  timezone: string | undefined;
  type: "live" | "prerecorded" | "replay" | undefined;
  until: Date | undefined;
};

export type UseEventFormInitialValues = Partial<UseEventFormValues>;

export type UseEventFormValidators = {
  [K in keyof UseEventFormValues]?: (
    value: UseEventFormValues[K],
  ) => null | string | undefined;
};

export type UseEventFormDefaultValues = Partial<UseEventFormValues>;

export type UseEventFormInput = {
  initialValues?: UseEventFormInitialValues;
  validate?: UseEventFormValidators;
};

export type UseEventFormOutput = {
  defaultValues: UseEventFormDefaultValues;
  form: UseFormReturnType<UseEventFormValues>;
};

import { UseFormReturnType } from "@mantine/form";

import { staticChoiceValues } from "./constants";

export type UseEventFormAllowedValues = {
  ends: typeof staticChoiceValues.ends;
  frequency: typeof staticChoiceValues.frequency;
  recurring: typeof staticChoiceValues.recurring;
  show: string[];
  timezone: typeof staticChoiceValues.timezone;
  type: typeof staticChoiceValues.type;
};

export type UseEventFormValues = {
  count: number | undefined;
  end: Date | undefined;
  ends: undefined | UseEventFormAllowedValues["ends"][number];
  frequency: undefined | UseEventFormAllowedValues["frequency"][number];
  interval: number | undefined;
  recurring: undefined | UseEventFormAllowedValues["recurring"][number];
  show: string | undefined;
  start: Date | undefined;
  timezone: undefined | UseEventFormAllowedValues["timezone"][number];
  type: undefined | UseEventFormAllowedValues["type"][number];
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
  allowedValues: UseEventFormAllowedValues;
  defaultValues: UseEventFormDefaultValues;
  form: UseFormReturnType<UseEventFormValues>;
  loading: boolean;
};

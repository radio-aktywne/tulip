import {
  UseShowFormInitialValues,
  UseShowFormValidators,
  UseShowFormValues,
} from "../../../../../../../../hooks/forms/use-show-form";

export type EditShowFormInitialData = UseShowFormInitialValues;

export type EditShowFormData = UseShowFormValues;

export type EditShowFormErrors = {
  [K in keyof UseShowFormValues]?: string;
};

export type EditShowFormValidators = UseShowFormValidators;

export type EditShowFormInput = {
  initialData: EditShowFormInitialData;
  onSave?: (
    data: EditShowFormData,
  ) => Promise<EditShowFormErrors | null | undefined>;
  validate?: EditShowFormValidators;
};

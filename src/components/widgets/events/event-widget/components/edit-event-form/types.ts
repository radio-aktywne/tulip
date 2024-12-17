import {
  UseEventFormInitialValues,
  UseEventFormValidators,
  UseEventFormValues,
} from "../../../../../../hooks/forms/use-event-form";

export type EditEventFormInitialData = UseEventFormInitialValues;

export type EditEventFormData = UseEventFormValues;

export type EditEventFormErrors = {
  [K in keyof UseEventFormValues]?: string;
};

export type EditEventFormValidators = UseEventFormValidators;

export type EditEventFormInput = {
  initialData: EditEventFormInitialData;
  onDelete?: () => void;
  onSave?: (
    data: EditEventFormData,
  ) => Promise<EditEventFormErrors | null | undefined>;
  validate?: EditEventFormValidators;
};

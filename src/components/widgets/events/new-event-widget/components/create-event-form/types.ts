import {
  UseEventFormValidators,
  UseEventFormValues,
} from "../../../../../../hooks/forms/use-event-form";

export type CreateEventFormData = UseEventFormValues;

export type CreateEventFormErrors = {
  [K in keyof UseEventFormValues]?: string;
};

export type CreateEventFormValidators = UseEventFormValidators;

export type CreateEventFormInput = {
  onCreate?: (
    data: CreateEventFormData,
  ) => Promise<CreateEventFormErrors | null | undefined>;
  validate?: CreateEventFormValidators;
};

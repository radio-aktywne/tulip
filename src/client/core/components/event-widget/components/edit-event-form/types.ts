import type {
  UseFormInitialValues,
  UseFormOnError,
  UseFormOnSubmit,
  UseFormSubmitInput,
  UseFormValues,
} from "../../../../../../isomorphic/core/hooks/use-form";
import type { Schemas } from "./schemas";

export type EditEventFormSchema = typeof Schemas.Values;

export type EditEventFormValues = UseFormValues<EditEventFormSchema>;

export type EditEventFormInitialValues =
  UseFormInitialValues<EditEventFormSchema>;

export type EditEventFormOnError = UseFormOnError;

export type EditEventFormSubmitInput = UseFormSubmitInput<EditEventFormSchema>;

export type EditEventFormOnSubmit = UseFormOnSubmit<EditEventFormSchema>;

export type EditEventFormInput = {
  disabled?: boolean;
  initialValues: EditEventFormValues;
  onError?: EditEventFormOnError;
  onSubmit: EditEventFormOnSubmit;
};

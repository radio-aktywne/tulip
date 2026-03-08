import type {
  UseFormInitialValues,
  UseFormOnError,
  UseFormOnSubmit,
  UseFormSubmitInput,
  UseFormValues,
} from "../../../../../../isomorphic/core/hooks/use-form";
import type { Schemas } from "./schemas";

export type CreateEventFormSchema = typeof Schemas.Values;

export type CreateEventFormValues = UseFormValues<CreateEventFormSchema>;

export type CreateEventFormInitialValues =
  UseFormInitialValues<CreateEventFormSchema>;

export type CreateEventFormOnError = UseFormOnError;

export type CreateEventFormSubmitInput =
  UseFormSubmitInput<CreateEventFormSchema>;

export type CreateEventFormOnSubmit = UseFormOnSubmit<CreateEventFormSchema>;

export type CreateEventFormInput = {
  initialValues: CreateEventFormValues;
  onError?: CreateEventFormOnError;
  onSubmit: CreateEventFormOnSubmit;
};

import type {
  UseFormInitialValues,
  UseFormOnError,
  UseFormOnSubmit,
  UseFormSubmitInput,
  UseFormValues,
} from "../../../../../../../../isomorphic/core/hooks/use-form";
import type { Schemas } from "./schemas";

export type EditShowFormSchema = typeof Schemas.Values;

export type EditShowFormValues = UseFormValues<EditShowFormSchema>;

export type EditShowFormInitialValues =
  UseFormInitialValues<EditShowFormSchema>;

export type EditShowFormOnError = UseFormOnError;

export type EditShowFormSubmitInput = UseFormSubmitInput<EditShowFormSchema>;

export type EditShowFormOnSubmit = UseFormOnSubmit<EditShowFormSchema>;

export type EditShowFormInput = {
  initialValues: EditShowFormValues;
  onError?: EditShowFormOnError;
  onSubmit: EditShowFormOnSubmit;
};

import type {
  UseFormInitialValues,
  UseFormOnError,
  UseFormOnSubmit,
  UseFormSubmitInput,
  UseFormValues,
} from "../../../../../../../../isomorphic/core/hooks/use-form";
import type { Schemas } from "./schemas";

export type CreateShowFormSchema = typeof Schemas.Values;

export type CreateShowFormValues = UseFormValues<CreateShowFormSchema>;

export type CreateShowFormInitialValues =
  UseFormInitialValues<CreateShowFormSchema>;

export type CreateShowFormOnError = UseFormOnError;

export type CreateShowFormSubmitInput =
  UseFormSubmitInput<CreateShowFormSchema>;

export type CreateShowFormOnSubmit = UseFormOnSubmit<CreateShowFormSchema>;

export type CreateShowFormInput = {
  initialValues: CreateShowFormValues;
  onError?: CreateShowFormOnError;
  onSubmit: CreateShowFormOnSubmit;
};

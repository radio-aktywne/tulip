import {
  UseShowFormValidators,
  UseShowFormValues,
} from "../../../../../../hooks/forms/use-show-form";

export type CreateShowFormData = UseShowFormValues;

export type CreateShowFormErrors = {
  [K in keyof UseShowFormValues]?: string;
};

export type CreateShowFormValidators = UseShowFormValidators;

export type CreateShowFormInput = {
  onCreate?: (
    data: CreateShowFormData,
  ) => Promise<CreateShowFormErrors | null | undefined>;
  validate?: CreateShowFormValidators;
};

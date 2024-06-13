import { ReactElement, ReactNode } from "react";
import { FieldEditInputProps } from "./FieldEdit";

export type FieldRenderDisplay<V> = (value: V) => ReactNode;

export type FieldRenderInput<V> = (
  props: FieldEditInputProps<V>,
) => ReactElement<FieldEditInputProps<V>>;

export type FieldValidate<V> = (value: V) => string | null | undefined;

export type FieldOnUpdate<V> = (value: V) => Promise<string | null | undefined>;

export type FieldProps<V> = {
  title: string;
  value: V;
  required?: boolean;
  renderDisplay: FieldRenderDisplay<V>;
  renderInput: FieldRenderInput<V>;
  validate?: FieldValidate<V>;
  onUpdate?: FieldOnUpdate<V>;
};

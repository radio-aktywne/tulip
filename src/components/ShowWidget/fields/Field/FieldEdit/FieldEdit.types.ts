import { ReactElement, ReactNode } from "react";

export type FieldEditInputProps<V> = {
  checked?: boolean;
  defaultValue?: V;
  error?: ReactNode;
  onBlur?: () => void;
  onChange: () => void;
  onFocus?: () => void;
  required?: boolean;
  value?: V;
};

export type FieldEditRender<V> = (
  props: FieldEditInputProps<V>,
) => ReactElement<FieldEditInputProps<V>>;

export type FieldEditValidate<V> = (value: V) => string | null | undefined;

export type FieldEditOnSave<V> = (
  value: V,
) => Promise<string | null | undefined>;

export type FieldEditOnCancel = () => void;

export type FieldEditProps<V> = {
  title: string;
  value: V;
  required?: boolean;
  render: FieldEditRender<V>;
  validate?: FieldEditValidate<V>;
  onSave?: FieldEditOnSave<V>;
  onCancel?: FieldEditOnCancel;
};

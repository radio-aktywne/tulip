import { ReactElement, ReactNode } from "react";

export type FieldInputFormProps<V> = {
  checked?: boolean;
  defaultValue?: V;
  error?: ReactNode;
  onBlur?: () => void;
  onChange?: () => void;
  onFocus?: () => void;
  value?: V;
};

export type FieldInputProps<V> = FieldInputFormProps<V> & {
  required?: boolean;
};

export type FieldRender<V> = (
  props: FieldInputProps<V>,
) => ReactElement<FieldInputProps<V>>;

export type FieldProps<V> = {
  title: string;
  required?: boolean;
  input?: FieldInputFormProps<V>;
  render: FieldRender<V>;
};

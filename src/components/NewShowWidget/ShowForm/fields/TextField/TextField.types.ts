import { FieldInputFormProps } from "../Field";

export type TextFieldProps = {
  title: string;
  required?: boolean;
  input?: FieldInputFormProps<string | undefined>;
};

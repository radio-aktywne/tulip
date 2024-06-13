import { FieldInputFormProps } from "../Field";

export type TextareaFieldProps = {
  title: string;
  required?: boolean;
  input?: FieldInputFormProps<string | undefined>;
};

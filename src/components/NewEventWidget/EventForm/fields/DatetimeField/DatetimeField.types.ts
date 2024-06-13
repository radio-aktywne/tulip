import { FieldInputFormProps } from "../Field";

export type DatetimeFieldProps = {
  title: string;
  format?: string;
  required?: boolean;
  input?: FieldInputFormProps<Date | undefined>;
};

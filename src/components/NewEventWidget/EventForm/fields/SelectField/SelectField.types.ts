import { ComboboxData } from "@mantine/core";
import { FieldInputFormProps } from "../Field";

export type SelectFieldProps = {
  title: string;
  data?: ComboboxData;
  required?: boolean;
  input?: FieldInputFormProps<string | undefined>;
};

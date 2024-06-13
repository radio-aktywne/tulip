import { ComboboxData } from "@mantine/core";

export type SelectFieldProps = {
  title: string;
  value: string | undefined;
  format?: (value: string) => string;
  data?: ComboboxData;
  fallback?: string;
  required?: boolean;
  validate?: (value: string | undefined) => string | null | undefined;
  onUpdate?: (value: string | undefined) => Promise<string | null | undefined>;
};

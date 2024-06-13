export type TextFieldProps = {
  title: string;
  value: string | undefined;
  format?: (value: string) => string;
  fallback?: string;
  required?: boolean;
  validate?: (value: string | undefined) => string | null | undefined;
  onUpdate?: (value: string | undefined) => Promise<string | null | undefined>;
};

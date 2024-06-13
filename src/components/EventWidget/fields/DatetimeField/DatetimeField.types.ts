export type DatetimeFieldProps = {
  title: string;
  value: Date | undefined;
  format?: string;
  fallback?: string;
  required?: boolean;
  validate?: (value: Date | undefined) => string | null | undefined;
  onUpdate?: (value: Date | undefined) => Promise<string | null | undefined>;
};

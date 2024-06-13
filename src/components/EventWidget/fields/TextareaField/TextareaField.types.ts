export type TextareaFieldProps = {
  title: string;
  value: string | undefined;
  fallback?: string;
  required?: boolean;
  validate?: (value: string | undefined) => string | null | undefined;
  onUpdate?: (value: string | undefined) => Promise<string | null | undefined>;
};

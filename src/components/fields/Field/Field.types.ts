import { ReactNode } from "react";

export type FieldProps = {
  title: string;
  required?: boolean;
  children?: ReactNode;
};

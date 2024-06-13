import { ReactNode } from "react";

export type FieldDisplayRender<V> = (value: V) => ReactNode;

export type FieldDisplayProps<V> = {
  title: string;
  value: V;
  render: FieldDisplayRender<V>;
  onEdit?: () => void;
};

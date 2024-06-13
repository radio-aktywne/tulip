import type { Metadata } from "next";
import { ReactNode } from "react";
import { labels } from "../../../config/labels";

export const metadata: Metadata = {
  title: labels.pages.newEvent.title,
  description: labels.pages.newEvent.description,
};

export type NewEventLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function NewEventLayout({ children }: NewEventLayoutProps) {
  return children;
}

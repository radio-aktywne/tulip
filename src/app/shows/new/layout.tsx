import type { Metadata } from "next";
import { ReactNode } from "react";
import { labels } from "../../../config/labels";

export const metadata: Metadata = {
  title: labels.pages.newShow.title,
  description: labels.pages.newShow.description,
};

export type NewShowLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function NewShowLayout({ children }: NewShowLayoutProps) {
  return children;
}

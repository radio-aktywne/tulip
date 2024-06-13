import type { Metadata } from "next";
import { ReactNode } from "react";
import { labels } from "../../config/labels";

export const metadata: Metadata = {
  title: labels.pages.shows.title,
  description: labels.pages.shows.description,
};

export type ShowsLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function ShowsLayout({ children }: ShowsLayoutProps) {
  return children;
}

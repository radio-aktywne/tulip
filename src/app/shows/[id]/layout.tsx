import type { Metadata } from "next";
import { ReactNode } from "react";
import { labels } from "../../../config/labels";

type ShowLayoutParams = Readonly<{
  id: string;
}>;

export type ShowLayoutProps = Readonly<{
  children: ReactNode;
  params: ShowLayoutParams;
}>;

export async function generateMetadata({
  params,
}: ShowLayoutProps): Promise<Metadata> {
  return {
    title: labels.pages.show.title(params.id),
    description: labels.pages.show.description,
  };
}

export default function ShowLayout({ children }: ShowLayoutProps) {
  return children;
}

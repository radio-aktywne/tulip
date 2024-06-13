import type { Metadata } from "next";
import { ReactNode } from "react";
import { labels } from "../../../config/labels";

type EventLayoutParams = Readonly<{
  id: string;
}>;

export type EventLayoutProps = Readonly<{
  children: ReactNode;
  params: EventLayoutParams;
}>;

export async function generateMetadata({
  params,
}: EventLayoutProps): Promise<Metadata> {
  return {
    title: labels.pages.event.title(params.id),
    description: labels.pages.event.description,
  };
}

export default function EventLayout({ children }: EventLayoutProps) {
  return children;
}

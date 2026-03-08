import { connection } from "next/server";

import type { LayoutInput } from "../../../../types";
import type { Keys } from "./types";

import { EventsDetailLayoutView } from "./layout.view";

export default async function EventsDetailLayout({
  children,
}: LayoutInput<Keys.Path, Keys.Slots>) {
  await connection();

  return <EventsDetailLayoutView>{children}</EventsDetailLayoutView>;
}

import { connection } from "next/server";

import type { LayoutInput } from "../../../types";
import type { Keys } from "./types";

import { EventsMasterLayoutView } from "./layout.view";

export default async function EventsMasterLayout({
  children,
}: LayoutInput<Keys.Path, Keys.Slots>) {
  await connection();

  return <EventsMasterLayoutView>{children}</EventsMasterLayoutView>;
}

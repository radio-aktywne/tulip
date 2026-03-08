import { connection } from "next/server";

import type { LoadingInput } from "../../../../types";

import { EventsDetailLoadingView } from "./loading.view";

export default async function EventsDetailLoading({}: LoadingInput) {
  await connection();

  return <EventsDetailLoadingView />;
}

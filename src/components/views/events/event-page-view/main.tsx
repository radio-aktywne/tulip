import { notFound } from "next/navigation";

import {
  EventNotFoundError,
  getEvent,
} from "../../../../lib/beaver/events/get-event";
import { EventWidget } from "../../../widgets/events/event-widget";
import { EventPageViewInput } from "./types";

export async function EventPageView({ id }: EventPageViewInput) {
  try {
    const { event } = await getEvent({ id: id });

    return <EventWidget event={event} />;
  } catch (error) {
    if (error instanceof EventNotFoundError) notFound();
    throw error;
  }
}

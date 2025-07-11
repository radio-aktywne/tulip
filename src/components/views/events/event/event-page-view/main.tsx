import { notFound } from "next/navigation";

import {
  EventNotFoundError,
  getEvent,
} from "../../../../../lib/beaver/events/get-event";
import { listShows } from "../../../../../lib/beaver/shows/list-shows";
import { EventWidget } from "../../../../widgets/events/edit-event-widget";
import { EventPageViewInput } from "./types";

export async function EventPageView({ id }: EventPageViewInput) {
  try {
    const { event } = await getEvent({
      id: id,
      include: JSON.stringify({ show: true }),
    });

    const { shows } = await listShows();

    return <EventWidget event={event} shows={shows} />;
  } catch (error) {
    if (error instanceof EventNotFoundError) notFound();
    throw error;
  }
}

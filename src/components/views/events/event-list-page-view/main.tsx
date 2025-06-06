import { listEvents } from "../../../../lib/beaver/events/list-events";
import { EventListWidget } from "../../../widgets/events/event-list-widget";
import { EventListPageViewInput } from "./types";

export async function EventListPageView({}: EventListPageViewInput) {
  const { events } = await listEvents();

  return <EventListWidget events={events} />;
}

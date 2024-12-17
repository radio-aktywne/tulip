import { listEvents } from "../../../../lib/beaver/events/list-events";
import { EventListWidget } from "../../../widgets/events/event-list-widget";
import { perPage } from "./constants";
import { EventListPageViewInput } from "./types";

export async function EventListPageView({}: EventListPageViewInput) {
  const { events } = await listEvents({ limit: perPage });

  return <EventListWidget events={events} perPage={perPage} />;
}

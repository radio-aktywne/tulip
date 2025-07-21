import { EventListWidget } from "../../../widgets/events/event-list-widget";
import { EventListPageViewInput } from "./types";

export async function EventListPageView({ current }: EventListPageViewInput) {
  return <EventListWidget current={current} />;
}

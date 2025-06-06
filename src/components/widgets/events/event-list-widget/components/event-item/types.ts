import { ListEventsOutput } from "../../../../../../lib/beaver/events/list-events";

export type EventItemInput = {
  event: ListEventsOutput["events"]["events"][number];
};

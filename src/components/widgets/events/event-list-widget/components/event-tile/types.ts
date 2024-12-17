import { ListEventsOutput } from "../../../../../../lib/beaver/events/list-events";

export type EventTileInput = {
  event: ListEventsOutput["events"]["events"][number];
};

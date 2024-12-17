import {
  ListEventsInput,
  ListEventsOutput,
} from "../../../../lib/beaver/events/list-events";

export type EventListWidgetInput = {
  events: ListEventsOutput["events"];
  perPage?: number;
  where?: ListEventsInput["where"];
};

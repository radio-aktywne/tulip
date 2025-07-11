import { GetEventOutput } from "../../../../lib/beaver/events/get-event";
import { ListShowsOutput } from "../../../../lib/beaver/shows/list-shows";

export type EventWidgetInput = {
  event: GetEventOutput["event"];
  shows: ListShowsOutput["shows"];
};

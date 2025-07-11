import { ListShowsOutput } from "../../../../lib/beaver/shows/list-shows";

export type NewEventWidgetInput = {
  shows: ListShowsOutput["shows"];
};

import {
  ListShowsInput,
  ListShowsOutput,
} from "../../../../lib/beaver/shows/list-shows";

export type ShowListWidgetInput = {
  shows: ListShowsOutput["shows"];
  where?: ListShowsInput["where"];
};

import {
  ListShowsInput,
  ListShowsOutput,
} from "../../../../lib/beaver/shows/list-shows";

export type ShowListWidgetInput = {
  perPage?: number;
  shows: ListShowsOutput["shows"];
  where?: ListShowsInput["where"];
};

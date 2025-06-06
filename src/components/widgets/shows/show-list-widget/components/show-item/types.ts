import { ListShowsOutput } from "../../../../../../lib/beaver/shows/list-shows";

export type ShowItemInput = {
  show: ListShowsOutput["shows"]["shows"][number];
};

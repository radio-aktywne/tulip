import { ListShowsOutput } from "../../../../../../lib/beaver/shows/list-shows";

export type ShowTileInput = {
  show: ListShowsOutput["shows"]["shows"][number];
};

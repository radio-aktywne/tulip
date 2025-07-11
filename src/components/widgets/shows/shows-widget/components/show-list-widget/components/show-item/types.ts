import { ListShowsOutput } from "../../../../../../../../lib/beaver/shows/list-shows";

export type ShowItemInput = {
  onDelete?: () => void;
  onEdit?: () => void;
  show: ListShowsOutput["shows"]["shows"][number];
};

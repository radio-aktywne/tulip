import { ListShowsOutput } from "../../../../../../lib/beaver/shows/list-shows";

export type ShowListWidgetInput = {
  onCreate?: () => void;
  onDelete?: (show: ListShowsOutput["shows"]["shows"][number]) => void;
  onEdit?: (show: ListShowsOutput["shows"]["shows"][number]) => void;
  shows: ListShowsOutput["shows"];
};

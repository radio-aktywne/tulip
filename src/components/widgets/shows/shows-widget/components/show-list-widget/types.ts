import { ListShowsOutput } from "../../../../../../lib/beaver/shows/list-shows";

export type ShowListWidgetInput = {
  onCreate?: () => void;
  onDelete?: (show: ListShowsOutput["shows"]["shows"][number]) => void;
  onEdit?: (show: ListShowsOutput["shows"]["shows"][number]) => void;
  onPageChange?: (page: number) => void;
  onQueryChange?: (query: string) => void;
  page?: number;
  perPage: number;
  query?: string;
  shows?: ListShowsOutput["shows"];
};

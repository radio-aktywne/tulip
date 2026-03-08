import type { ShowsModelsShow } from "../../../../../../common/apis/beaver/types";

export type DisplayShowsWidgetInput = {
  limit: number;
  onCreate?: () => void;
  onDelete?: (id: string) => Promise<unknown>;
  onEdit?: (id: string) => void;
  onPageChange?: (page: number) => void;
  onQueryChange?: (query: string) => void;
  page: number;
  query?: string;
  shows: Omit<ShowsModelsShow, "events">[];
  total: number;
};

import type { ShowsModelsShow } from "../../../../../../../../common/apis/beaver/types";

export type ShowItemInput = {
  onDelete?: () => Promise<unknown>;
  onEdit?: () => void;
  show: Omit<ShowsModelsShow, "events">;
};

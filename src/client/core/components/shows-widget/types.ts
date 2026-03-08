import type {
  ShowOrderByInput,
  ShowsModelsShow,
} from "../../../../common/apis/beaver/types";

export type ShowsWidgetDisplayState = {
  state: "display";
};

export type ShowsWidgetEditState = {
  show: Omit<ShowsModelsShow, "events">;
  state: "edit";
};

export type ShowsWidgetCreateState = {
  state: "create";
};

export type ShowsWidgetState =
  | ShowsWidgetCreateState
  | ShowsWidgetDisplayState
  | ShowsWidgetEditState;

export type ShowsWidgetInput = {
  limit: number;
  order: ShowOrderByInput;
};

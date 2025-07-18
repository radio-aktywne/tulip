import {
  ListShowsInput,
  ListShowsOutput,
} from "../../../../lib/beaver/shows/list-shows";

export type ShowsWidgetInput = {
  shows: ListShowsOutput["shows"];
} & ListShowsInput;

export type ShowsWidgetDisplayState = {
  state: "display";
};

export type ShowsWidgetEditState = {
  show: ShowsWidgetInput["shows"]["shows"][number];
  state: "edit";
};

export type ShowsWidgetCreateState = {
  state: "create";
};

export type ShowsWidgetState =
  | ShowsWidgetCreateState
  | ShowsWidgetDisplayState
  | ShowsWidgetEditState;

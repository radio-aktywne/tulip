import { components } from "../../../../api/beaver";

export type EventTileLabels = {
  text: (id: string) => string;
};

export type EventTileProps = {
  event: components["schemas"]["events_models_Event"];
  labels: EventTileLabels;
};

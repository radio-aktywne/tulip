import { components } from "../../../../api/emishows";

export type EventTileLabels = {
  text: (id: string) => string;
};

export type EventTileProps = {
  event: components["schemas"]["events_models_Event"];
  labels: EventTileLabels;
};

import { components } from "../../../../api/beaver";

export type ShowTileLabels = {
  text: (id: string) => string;
};

export type ShowTileProps = {
  show: components["schemas"]["events_models_Show"];
  labels: ShowTileLabels;
};

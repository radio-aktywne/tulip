import { components } from "../../../api/emishows";

export type ShowTileLabels = {
  text: (id: string) => string;
};

export type ShowTileProps = {
  show: components["schemas"]["Show"];
  labels: ShowTileLabels;
};

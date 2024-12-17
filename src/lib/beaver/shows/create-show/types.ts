import { components } from "../../../../services/beaver";

export type CreateShowInput = {
  description?: null | string;
  id?: string;
  title: string;
};

export type CreateShowOutput = {
  show: components["schemas"]["shows_models_Show"];
};

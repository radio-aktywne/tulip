import { components } from "../../../../services/beaver";

export type UpdateShowInput = {
  data: {
    description?: null | string;
    id?: string;
    title?: string;
  };
  id: string;
};

export type UpdateShowOutput = {
  show: components["schemas"]["shows_models_Show"];
};

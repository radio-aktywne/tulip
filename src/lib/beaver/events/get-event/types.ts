import { components } from "../../../../services/beaver";

export type GetEventInput = {
  id: string;
  include?: null | string;
};

export type GetEventOutput = {
  event: components["schemas"]["events_models_Event"];
};

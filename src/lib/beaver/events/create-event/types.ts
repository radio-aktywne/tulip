import { components } from "../../../../services/beaver";

export type CreateEventInput = {
  end: string;
  id?: string;
  recurrence?: components["schemas"]["EventCreateInput"]["recurrence"];
  show: string;
  start: string;
  timezone: string;
  type: components["schemas"]["EventCreateInput"]["type"];
};

export type CreateEventOutput = {
  event: components["schemas"]["events_models_Event"];
};

import { components } from "../../../../services/beaver";

export type UpdateEventInput = {
  data: {
    end?: string;
    id?: string;
    recurrence?: components["schemas"]["EventUpdateInput"]["recurrence"];
    show?: string;
    start?: string;
    timezone?: string;
    type?: components["schemas"]["EventUpdateInput"]["type"];
  };
  id: string;
};

export type UpdateEventOutput = {
  event: components["schemas"]["events_models_Event"];
};

import { components } from "../../api/emishows";

export type EventsWidgetProps = {
  events: components["schemas"]["events_models_ListResponse"];
  page: number;
  perPage: number;
};

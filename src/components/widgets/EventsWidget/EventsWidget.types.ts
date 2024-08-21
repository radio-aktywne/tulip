import { components } from "../../../api/emishows";

export type EventsWidgetProps = {
  events: components["schemas"]["EventList"];
  page: number;
  perPage: number;
};

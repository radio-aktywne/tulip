import { components } from "../../../api/beaver";

export type EventsWidgetProps = {
  events: components["schemas"]["EventList"];
  page: number;
  perPage: number;
};

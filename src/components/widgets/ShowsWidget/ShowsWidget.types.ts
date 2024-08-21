import { components } from "../../../api/emishows";

export type ShowsWidgetProps = {
  shows: components["schemas"]["ShowList"];
  page: number;
  perPage: number;
};

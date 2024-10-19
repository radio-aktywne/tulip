import { components } from "../../../api/beaver";

export type ShowsWidgetProps = {
  shows: components["schemas"]["ShowList"];
  page: number;
  perPage: number;
};

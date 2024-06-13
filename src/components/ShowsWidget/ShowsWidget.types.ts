import { components } from "../../api/emishows";

export type ShowsWidgetProps = {
  shows: components["schemas"]["shows_models_ListResponse"];
  page: number;
  perPage: number;
};

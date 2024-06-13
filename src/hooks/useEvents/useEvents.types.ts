import { GetEventsProps } from "../../actions";
import { components } from "../../api/emishows";

export type Events = components["schemas"]["events_models_ListResponse"];

export type UseEventsProps = GetEventsProps & {
  interval?: number;
};

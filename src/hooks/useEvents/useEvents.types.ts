import { GetEventsProps } from "../../actions";
import { components } from "../../api/beaver";

export type Events = components["schemas"]["EventList"];

export type UseEventsProps = GetEventsProps & {
  interval?: number;
};

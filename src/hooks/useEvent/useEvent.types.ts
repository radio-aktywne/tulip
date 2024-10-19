import { GetEventProps } from "../../actions";
import { components } from "../../api/beaver";

export type Event = components["schemas"]["events_models_Event"];

export type UseEventProps = GetEventProps & {
  interval?: number;
};

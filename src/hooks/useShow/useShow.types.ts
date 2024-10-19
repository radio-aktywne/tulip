import { GetShowProps } from "../../actions";
import { components } from "../../api/beaver";

export type Show = components["schemas"]["events_models_Show"];

export type UseShowProps = GetShowProps & {
  interval?: number;
};

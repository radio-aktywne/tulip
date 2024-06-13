import { GetShowsProps } from "../../actions";
import { components } from "../../api/emishows";

export type Shows = components["schemas"]["shows_models_ListResponse"];

export type UseShowsProps = GetShowsProps & {
  interval?: number;
};

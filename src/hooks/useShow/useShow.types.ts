import { GetShowProps } from "../../actions";
import { components } from "../../api/emishows";

export type Show = components["schemas"]["Show"];

export type UseShowProps = GetShowProps & {
  interval?: number;
};

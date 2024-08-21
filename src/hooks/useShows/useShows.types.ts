import { GetShowsProps } from "../../actions";
import { components } from "../../api/emishows";

export type Shows = components["schemas"]["ShowList"];

export type UseShowsProps = GetShowsProps & {
  interval?: number;
};

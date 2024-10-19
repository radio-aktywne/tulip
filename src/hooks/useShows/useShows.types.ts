import { GetShowsProps } from "../../actions";
import { components } from "../../api/beaver";

export type Shows = components["schemas"]["ShowList"];

export type UseShowsProps = GetShowsProps & {
  interval?: number;
};

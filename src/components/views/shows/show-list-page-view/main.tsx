import { listShows } from "../../../../lib/beaver/shows/list-shows";
import { ShowListWidget } from "../../../widgets/shows/show-list-widget";
import { ShowListPageViewInput } from "./types";

export async function ShowListPageView({}: ShowListPageViewInput) {
  const { shows } = await listShows();

  return <ShowListWidget shows={shows} />;
}

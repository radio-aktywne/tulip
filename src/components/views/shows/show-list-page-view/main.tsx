import { listShows } from "../../../../lib/beaver/shows/list-shows";
import { ShowListWidget } from "../../../widgets/shows/show-list-widget";
import { perPage } from "./constants";
import { ShowListPageViewInput } from "./types";

export async function ShowListPageView({}: ShowListPageViewInput) {
  const { shows } = await listShows({ limit: perPage });

  return <ShowListWidget perPage={perPage} shows={shows} />;
}

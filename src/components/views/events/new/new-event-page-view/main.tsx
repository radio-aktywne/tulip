import { listShows } from "../../../../../lib/beaver/shows/list-shows";
import { NewEventWidget } from "../../../../widgets/events/new-event-widget";
import { NewEventPageViewInput } from "./types";

export async function NewEventPageView({}: NewEventPageViewInput) {
  const { shows } = await listShows();

  return <NewEventWidget shows={shows} />;
}

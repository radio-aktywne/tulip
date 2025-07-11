import { EventNotFoundMetadata } from "../../../../../components/metadata/events/event/event-not-found-metadata";
import { EventNotFoundView } from "../../../../../components/views/events/event/event-not-found-view";
import { EventNotFoundInput } from "./types";

export const dynamic = "force-dynamic";

export default function EventNotFound({}: EventNotFoundInput) {
  return (
    <>
      <EventNotFoundMetadata />
      <EventNotFoundView />
    </>
  );
}

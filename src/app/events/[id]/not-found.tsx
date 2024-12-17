import { EventNotFoundMetadata } from "../../../components/metadata/events/event-not-found-metadata";
import { EventNotFoundView } from "../../../components/views/events/event-not-found-view";
import { EventNotFoundInput } from "./types";

export default function EventNotFound({}: EventNotFoundInput) {
  return (
    <>
      <EventNotFoundMetadata />
      <EventNotFoundView />
    </>
  );
}

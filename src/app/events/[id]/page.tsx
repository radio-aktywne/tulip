import { notFound } from "next/navigation";
import { getEvent } from "../../../actions";
import { EventWidget } from "../../../components";

type EventPageParams = Readonly<{
  id: string;
}>;

export type EventPageProps = Readonly<{
  params: EventPageParams;
}>;

export const dynamic = "force-dynamic";

export default async function EventPage({ params }: EventPageProps) {
  const { data: event, error } = await getEvent({ id: params.id });

  if (error !== undefined) throw new Error(error);
  if (event === undefined) notFound();

  return <EventWidget event={event} />;
}

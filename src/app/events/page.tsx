import { redirect } from "next/navigation";
import { getEvents } from "../../actions";
import { EventsWidget } from "../../components";
import { createModifiedURLSearchParams } from "../../utils/url";

type EventsPageSearchParams = Readonly<{
  page?: string | string[];
}>;

export type EventsPageProps = Readonly<{
  searchParams: EventsPageSearchParams;
}>;

export const dynamic = "force-dynamic";

const perPage = 5;

function redirectWithParams(params: URLSearchParams): never {
  redirect("/events?" + params.toString());
}

async function validatePage(params: EventsPageSearchParams) {
  const page = params.page;

  if (page === undefined)
    redirectWithParams(createModifiedURLSearchParams(params, { page: "1" }));

  if (Array.isArray(page))
    redirectWithParams(
      createModifiedURLSearchParams(params, { page: page[0] }),
    );

  const parsedPage = parseInt(page, 10);

  if (isNaN(parsedPage) || parsedPage < 1)
    redirectWithParams(createModifiedURLSearchParams(params, { page: "1" }));

  const { data: checkEvents, error: checkError } = await getEvents({
    limit: 0,
  });

  if (checkError !== undefined) throw new Error(checkError);

  const offset = perPage * (parsedPage - 1);

  if (checkEvents.count > 0 && offset >= checkEvents.count)
    redirectWithParams(
      createModifiedURLSearchParams(params, {
        page: (Math.ceil(checkEvents.count / perPage) || 1).toString(),
      }),
    );

  return parsedPage;
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const page = await validatePage(searchParams);
  const limit = perPage;
  const offset = perPage * (page - 1);

  const { data: events, error } = await getEvents({ limit, offset });

  if (error !== undefined) throw new Error(error);

  return <EventsWidget events={events} page={page} perPage={perPage} />;
}

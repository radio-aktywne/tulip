import { redirect } from "next/navigation";
import { getShows } from "../../actions";
import { ShowsWidget } from "../../components";
import { createModifiedURLSearchParams } from "../../utils/url";

type ShowsPageSearchParams = Readonly<{
  page?: string | string[];
}>;

export type ShowsPageProps = Readonly<{
  searchParams: ShowsPageSearchParams;
}>;

export const dynamic = "force-dynamic";

const perPage = 5;

function redirectWithParams(params: URLSearchParams): never {
  redirect("/shows?" + params.toString());
}

async function validatePage(params: ShowsPageSearchParams) {
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

  const { data: checkShows, error: checkError } = await getShows({ limit: 0 });

  if (checkError !== undefined) throw new Error(checkError);

  const offset = perPage * (parsedPage - 1);

  if (checkShows.count > 0 && offset >= checkShows.count)
    redirectWithParams(
      createModifiedURLSearchParams(params, {
        page: (Math.ceil(checkShows.count / perPage) || 1).toString(),
      }),
    );

  return parsedPage;
}

export default async function ShowsPage({ searchParams }: ShowsPageProps) {
  const page = await validatePage(searchParams);
  const limit = perPage;
  const offset = perPage * (page - 1);

  const { data: shows, error } = await getShows({ limit, offset });

  if (error !== undefined) throw new Error(error);

  return <ShowsWidget shows={shows} page={page} perPage={perPage} />;
}

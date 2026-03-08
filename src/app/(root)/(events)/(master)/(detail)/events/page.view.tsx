import type { PageViewInput } from "../../../../../types";
import type { Schemas } from "./schemas";

import { ListEventsWidget } from "../../../../../../client/core/components/list-events-widget";
import { LoadingWidget } from "../../../../../../common/core/components/generic/loading-widget";
import { Hydrated } from "../../../../../../isomorphic/generic/components/hydrated";

export async function EventsPageView({
  queryParameters,
}: PageViewInput<typeof Schemas.Path, typeof Schemas.Query>) {
  return (
    <Hydrated fallback={<LoadingWidget />}>
      <ListEventsWidget date={queryParameters.date} />
    </Hydrated>
  );
}

import type { PageViewInput } from "../../../../../../types";
import type { Schemas } from "./schemas";

import { NewEventWidget } from "../../../../../../../client/core/components/new-event-widget";
import { LoadingWidget } from "../../../../../../../common/core/components/generic/loading-widget";
import { Hydrated } from "../../../../../../../isomorphic/generic/components/hydrated";

export async function EventsNewPageView({}: PageViewInput<
  typeof Schemas.Path,
  typeof Schemas.Query
>) {
  return (
    <Hydrated fallback={<LoadingWidget />}>
      <NewEventWidget />
    </Hydrated>
  );
}

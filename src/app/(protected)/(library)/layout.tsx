import {
  MasterDetailLayout,
  MasterDetailLayoutDetailPanel,
  MasterDetailLayoutMasterPanel,
} from "@radio-aktywne/ui";

import { ShowsWidget } from "../../../components/widgets/shows/shows-widget";
import { listShows } from "../../../lib/beaver/shows/list-shows";
import { LibraryLayoutInput } from "./types";

export const dynamic = "force-dynamic";

export default async function LibraryLayout({ children }: LibraryLayoutInput) {
  const include = JSON.stringify({ events: true });
  const limit = 10;
  const order = JSON.stringify({ title: "asc" });
  const { shows } = await listShows({
    include: include,
    limit: limit,
    order: order,
  });

  return (
    <MasterDetailLayout>
      <MasterDetailLayoutMasterPanel span={3}>
        <ShowsWidget
          include={include}
          limit={limit}
          order={order}
          shows={shows}
        />
      </MasterDetailLayoutMasterPanel>
      <MasterDetailLayoutDetailPanel span={9}>
        {children}
      </MasterDetailLayoutDetailPanel>
    </MasterDetailLayout>
  );
}

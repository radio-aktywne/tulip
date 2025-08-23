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
  const props = {
    include: JSON.stringify({ events: true }),
    limit: 10,
    order: JSON.stringify({ title: "asc" }),
  };
  const { shows } = await listShows(props);

  return (
    <MasterDetailLayout>
      <MasterDetailLayoutMasterPanel span={3}>
        <ShowsWidget shows={shows} {...props} />
      </MasterDetailLayoutMasterPanel>
      <MasterDetailLayoutDetailPanel span={9}>
        {children}
      </MasterDetailLayoutDetailPanel>
    </MasterDetailLayout>
  );
}

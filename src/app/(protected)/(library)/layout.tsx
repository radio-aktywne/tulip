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
  const { shows } = await listShows({ include: include });

  return (
    <MasterDetailLayout>
      <MasterDetailLayoutMasterPanel>
        <ShowsWidget include={include} shows={shows} />
      </MasterDetailLayoutMasterPanel>
      <MasterDetailLayoutDetailPanel>{children}</MasterDetailLayoutDetailPanel>
    </MasterDetailLayout>
  );
}

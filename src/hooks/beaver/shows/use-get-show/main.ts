import { useInterval } from "@mantine/hooks";
import "client-only";
import { useCallback, useEffect, useMemo, useState } from "react";

import { getShow } from "../../../../actions/beaver/shows/get-show";
import { UseGetShowInput, UseGetShowOutput, UseGetShowState } from "./types";

export function useGetShow({
  id,
  include,
  interval = 1000 * 5,
}: UseGetShowInput): UseGetShowOutput {
  const [state, setState] = useState<UseGetShowState>({ loading: true });

  const refresh = useCallback(async () => {
    const { data, error } = await getShow({ id: id, include: include });
    if (error) setState({ error: error, loading: false });
    else setState({ data: data, loading: false });
  }, [id, include]);

  const { start, stop } = useInterval(refresh, interval);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  return useMemo(() => ({ ...state, refresh }), [state, refresh]);
}

import "client-only";

import { useInterval } from "@mantine/hooks";
import { useCallback, useEffect, useState } from "react";
import { getShows } from "../../actions";
import { Shows, UseShowsProps } from "./useShows.types";

export function useShows({
  interval = 1000 * 5,
  ...getShowsProps
}: UseShowsProps = {}) {
  const [shows, setShows] = useState<Shows>();

  const serializedGetShowsProps = JSON.stringify(getShowsProps);

  const fetchShows = useCallback(async () => {
    try {
      const parsedGetShowsProps = JSON.parse(serializedGetShowsProps);
      const response = await getShows(parsedGetShowsProps);
      if (response.error !== undefined) throw new Error(response.error);
      setShows(response.data);
    } catch (error) {
      setShows(undefined);
    }
  }, [serializedGetShowsProps]);

  const { start, stop } = useInterval(fetchShows, interval);

  useEffect(() => {
    fetchShows();
  }, [fetchShows]);

  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  return { shows, fetchShows };
}

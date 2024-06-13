import "client-only";

import { useInterval } from "@mantine/hooks";
import { useCallback, useEffect, useState } from "react";
import { getShow } from "../../actions";
import { Show, UseShowProps } from "./useShow.types";

export function useShow({
  interval = 1000 * 5,
  ...getShowProps
}: UseShowProps) {
  const [show, setShow] = useState<Show>();

  const serializedGetShowProps = JSON.stringify(getShowProps);

  const fetchShow = useCallback(async () => {
    try {
      const parsedGetShowProps = JSON.parse(serializedGetShowProps);
      const response = await getShow(parsedGetShowProps);
      if (response.error !== undefined) throw new Error(response.error);
      setShow(response.data);
    } catch (error) {
      setShow(undefined);
    }
  }, [serializedGetShowProps]);

  const { start, stop } = useInterval(fetchShow, interval);

  useEffect(() => {
    fetchShow();
  }, [fetchShow]);

  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  return { show, fetchShow };
}

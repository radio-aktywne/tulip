import "client-only";

import { useInterval } from "@mantine/hooks";
import { useCallback, useEffect, useState } from "react";
import { getEvent } from "../../actions";
import { Event, UseEventProps } from "./useEvent.types";

export function useEvent({
  interval = 1000 * 5,
  ...getEventProps
}: UseEventProps) {
  const [event, setEvent] = useState<Event>();

  const serializedGetEventProps = JSON.stringify(getEventProps);

  const fetchEvent = useCallback(async () => {
    try {
      const parsedGetEventProps = JSON.parse(serializedGetEventProps);
      const response = await getEvent(parsedGetEventProps);
      if (response.error !== undefined) throw new Error(response.error);
      setEvent(response.data);
    } catch (error) {
      setEvent(undefined);
    }
  }, [serializedGetEventProps]);

  const { start, stop } = useInterval(fetchEvent, interval);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  return { event, fetchEvent };
}

import "client-only";

import { useInterval } from "@mantine/hooks";
import { useCallback, useEffect, useState } from "react";
import { getEvents } from "../../actions";
import { Events, UseEventsProps } from "./useEvents.types";

export function useEvents({
  interval = 1000 * 5,
  ...getEventsProps
}: UseEventsProps = {}) {
  const [events, setEvents] = useState<Events>();

  const serializedGetEventsProps = JSON.stringify(getEventsProps);

  const fetchEvents = useCallback(async () => {
    try {
      const parsedGetEventsProps = JSON.parse(serializedGetEventsProps);
      const response = await getEvents(parsedGetEventsProps);
      if (response.error !== undefined) throw new Error(response.error);
      setEvents(response.data);
    } catch (error) {
      setEvents(undefined);
    }
  }, [serializedGetEventsProps]);

  const { start, stop } = useInterval(fetchEvents, interval);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  return { events, fetchEvents };
}

"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button, Center, Stack, Title } from "@mantine/core";
import { List, ListItem } from "@radio-aktywne/ui";
import Link from "next/link";
import { useEffect } from "react";

import { useListEvents } from "../../../../hooks/beaver/events/use-list-events";
import { useToasts } from "../../../../hooks/use-toasts";
import { EventItem } from "./components/event-item";
import { EventListWidgetInput } from "./types";

export function EventListWidget({
  events: prefetchedEvents,
  ...props
}: EventListWidgetInput) {
  const { _ } = useLingui();
  const toasts = useToasts();

  const { data: currentEvents, error } = useListEvents(props);
  const events = currentEvents ?? prefetchedEvents;

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  if (events.count === 0) {
    return <Title>{_(msg({ message: "No events." }))}</Title>;
  }

  return (
    <Stack mah="100%" w="100%">
      {events.count === 0 ? (
        <Center>
          <Title>{_(msg({ message: "No events." }))}</Title>
        </Center>
      ) : (
        <>
          <Center>
            <Title>{_(msg({ message: "Events" }))}</Title>
          </Center>
          <List style={{ overflowY: "auto" }}>
            {events.events.map((event) => (
              <ListItem key={event.id}>
                <EventItem event={event} />
              </ListItem>
            ))}
          </List>
        </>
      )}
      <Button component={Link} href="/events/new">
        {_(msg({ message: "Create" }))}
      </Button>
    </Stack>
  );
}

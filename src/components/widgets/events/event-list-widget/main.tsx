"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import {
  ActionIcon,
  Center,
  Group,
  Stack,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { List, ListItem } from "@radio-aktywne/ui";
import Link from "next/link";
import { useEffect } from "react";
import { MdAddCircleOutline } from "react-icons/md";

import { useListEvents } from "../../../../hooks/beaver/events/use-list-events";
import { useToasts } from "../../../../hooks/use-toasts";
import { EventItem } from "./components/event-item";
import { EventListWidgetInput } from "./types";

export function EventListWidget({
  events: prefetchedEvents,
  where,
}: EventListWidgetInput) {
  const { _ } = useLingui();
  const toasts = useToasts();

  const { data: currentEvents, error } = useListEvents({ where: where });
  const events = currentEvents ?? prefetchedEvents;

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  if (events.count === 0) {
    return <Title>{_(msg({ message: "No events." }))}</Title>;
  }

  return (
    <Stack mah="100%" w="100%">
      <Center>
        <Group>
          <Title>{_(msg({ message: "Events" }))}</Title>
          <ActionIcon
            component={Link}
            href={`/events/new`}
            size="auto"
            variant="transparent"
          >
            <MdAddCircleOutline size="2em" />
          </ActionIcon>
        </Group>
      </Center>
      <List style={{ overflowY: "auto" }}>
        {events.events.map((event) => (
          <ListItem key={event.id}>
            <UnstyledButton component={Link} href={`/events/${event.id}`}>
              <EventItem event={event} />
            </UnstyledButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}

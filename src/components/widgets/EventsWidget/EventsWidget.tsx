"use client";

import {
  Button,
  Center,
  Loader,
  Pagination,
  Stack,
  Title,
  UnstyledButton,
} from "@mantine/core";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { labels } from "../../../config/labels";
import { useEvents, useHydrated } from "../../../hooks";
import { EventTile } from "./EventTile";
import { EventsWidgetProps } from "./EventsWidget.types";

export function EventsWidget({
  events: prefetchedEvents,
  page,
  perPage,
}: EventsWidgetProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hydrated = useHydrated();

  const limit = perPage;
  const offset = perPage * (page - 1);
  const { events: currentEvents } = useEvents({ limit, offset });
  const events = currentEvents ?? prefetchedEvents;

  const handlePageChange = useCallback(
    (newPage: number) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("page", newPage.toString());
      router.push(pathname + "?" + newSearchParams.toString());
    },
    [router, pathname, searchParams],
  );

  useEffect(() => {
    const pages = Math.ceil(events.count / perPage) || 1;
    if (page > pages) handlePageChange(pages);
  }, [events.count, page, perPage, handlePageChange]);

  if (!hydrated) return <Loader />;

  if (events.count === 0) {
    return (
      <Stack>
        <Title>{labels.widgets.events.empty.text}</Title>
        <Button component={Link} href="/events/new">
          {labels.widgets.events.buttons.create.label}
        </Button>
      </Stack>
    );
  }

  const pages = Math.ceil(events.count / perPage);

  return (
    <Stack>
      <Stack>
        {events.events.map((event) => (
          <UnstyledButton
            key={event.id}
            component={Link}
            href={`/events/${event.id}`}
          >
            <EventTile
              event={event}
              labels={labels.widgets.events.tiles.event}
            />
          </UnstyledButton>
        ))}
      </Stack>
      <Center>
        <Stack>
          <Pagination
            value={page}
            onChange={handlePageChange}
            total={pages}
            withEdges
          />
          <Button component={Link} href="/events/new">
            {labels.widgets.events.buttons.create.label}
          </Button>
        </Stack>
      </Center>
    </Stack>
  );
}

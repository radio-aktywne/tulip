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
import { labels } from "../../config/labels";
import { useHydrated, useShows } from "../../hooks";
import { ShowTile } from "./ShowTile";
import { ShowsWidgetProps } from "./ShowsWidget.types";

export function ShowsWidget({
  shows: prefetchedShows,
  page,
  perPage,
}: ShowsWidgetProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hydrated = useHydrated();

  const limit = perPage;
  const offset = perPage * (page - 1);
  const { shows: currentShows } = useShows({ limit, offset });
  const shows = currentShows ?? prefetchedShows;

  const handlePageChange = useCallback(
    (newPage: number) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("page", newPage.toString());
      router.push(pathname + "?" + newSearchParams.toString());
    },
    [router, pathname, searchParams],
  );

  useEffect(() => {
    const pages = Math.ceil(shows.count / perPage) || 1;
    if (page > pages) handlePageChange(pages);
  }, [shows.count, page, perPage, handlePageChange]);

  if (!hydrated) return <Loader />;

  if (shows.count === 0) {
    return (
      <Stack>
        <Title>{labels.widgets.shows.empty.text}</Title>
        <Button component={Link} href="/shows/new">
          {labels.widgets.shows.buttons.create.label}
        </Button>
      </Stack>
    );
  }

  const pages = Math.ceil(shows.count / perPage);

  return (
    <Stack>
      <Stack>
        {shows.shows.map((show) => (
          <UnstyledButton
            key={show.id}
            component={Link}
            href={`/shows/${show.id}`}
          >
            <ShowTile show={show} labels={labels.widgets.shows.tiles.show} />
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
          <Button component={Link} href="/shows/new">
            {labels.widgets.shows.buttons.create.label}
          </Button>
        </Stack>
      </Center>
    </Stack>
  );
}

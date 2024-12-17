"use client";

import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Button, Center, Pagination, Stack, Title } from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useListShows } from "../../../../hooks/beaver/shows/use-list-shows";
import { useToasts } from "../../../../hooks/use-toasts";
import { ShowTile } from "./components/show-tile";
import { ShowListWidgetInput } from "./types";

export function ShowListWidget({
  perPage = 5,
  shows: prefetchedShows,
  where,
}: ShowListWidgetInput) {
  const [page, setPage] = useState(1);

  const { _ } = useLingui();
  const toasts = useToasts();

  const limit = perPage;
  const offset = perPage * (page - 1);
  const { data: currentShows, error } = useListShows({
    limit: limit,
    offset: offset,
    where: where,
  });
  const shows = currentShows ?? prefetchedShows;

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  if (shows.count === 0) {
    return <Title>{_(msg({ message: "No shows." }))}</Title>;
  }

  const pages = Math.ceil(shows.count / perPage);

  return (
    <Stack>
      <Stack>
        {shows.shows.map((show) => (
          <ShowTile key={show.id} show={show} />
        ))}
      </Stack>
      <Center>
        <Stack>
          <Pagination onChange={setPage} total={pages} value={page} withEdges />
          <Button component={Link} href={"/shows/new"}>
            {_(msg({ message: "Create" }))}
          </Button>
        </Stack>
      </Center>
    </Stack>
  );
}

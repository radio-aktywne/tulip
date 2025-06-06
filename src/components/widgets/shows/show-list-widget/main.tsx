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

import { useListShows } from "../../../../hooks/beaver/shows/use-list-shows";
import { useToasts } from "../../../../hooks/use-toasts";
import { ShowItem } from "./components/show-item";
import { ShowListWidgetInput } from "./types";

export function ShowListWidget({
  shows: prefetchedShows,
  where,
}: ShowListWidgetInput) {
  const { _ } = useLingui();
  const toasts = useToasts();

  const { data: currentShows, error } = useListShows({ where: where });
  const shows = currentShows ?? prefetchedShows;

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  if (shows.count === 0) {
    return <Title>{_(msg({ message: "No shows." }))}</Title>;
  }

  return (
    <Stack mah="100%" w="100%">
      <Center>
        <Group>
          <Title>{_(msg({ message: "Shows" }))}</Title>
          <ActionIcon
            component={Link}
            href={`/shows/new`}
            size="auto"
            variant="transparent"
          >
            <MdAddCircleOutline size="2em" />
          </ActionIcon>
        </Group>
      </Center>
      <List style={{ overflowY: "auto" }}>
        {shows.shows.map((show) => (
          <ListItem key={show.id}>
            <UnstyledButton component={Link} href={`/shows/${show.id}`}>
              <ShowItem show={show} />
            </UnstyledButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}

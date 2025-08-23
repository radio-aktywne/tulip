"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button, Center, Loader, Stack, Text, Title } from "@mantine/core";
import { List, ListItem } from "@radio-aktywne/ui";
import { useCallback } from "react";

import { deleteShow } from "../../../../../../actions/beaver/shows/delete-show";
import { useToasts } from "../../../../../../hooks/use-toasts";
import { Controls } from "./components/controls";
import { ShowItem } from "./components/show-item";
import { ShowListWidgetInput } from "./types";

export function ShowListWidget({
  onCreate,
  onDelete,
  onEdit,
  onPageChange,
  onQueryChange,
  page,
  perPage,
  query,
  shows,
}: ShowListWidgetInput) {
  const { _ } = useLingui();
  const toasts = useToasts();

  const handleDelete = useCallback(
    async (show: NonNullable<typeof shows>["shows"][number]) => {
      const { error } = await deleteShow({ id: show.id });

      if (error) toasts.error(_(error));
      else toasts.success(_(msg({ message: "Show deleted." })));

      onDelete?.(show);
    },
    [_, onDelete, toasts],
  );

  const handleEdit = useCallback(
    (show: NonNullable<typeof shows>["shows"][number]) => {
      onEdit?.(show);
    },
    [onEdit],
  );

  return (
    <Stack mah="100%" w="100%">
      <Center>
        <Title>{_(msg({ message: "Shows" }))}</Title>
      </Center>
      <Controls
        onPageChange={onPageChange}
        onQueryChange={onQueryChange}
        page={page}
        pages={shows ? Math.ceil(shows.count / perPage) : 0}
        query={query}
      />
      {shows === undefined ? (
        <Center py="sm">
          <Loader size="calc(var(--mantine-line-height-xs) * var(--mantine-font-size-xs))" />
        </Center>
      ) : shows.count === 0 ? (
        <Center py="sm">
          <Text size="xs">{_(msg({ message: "No shows" }))}</Text>
        </Center>
      ) : (
        <List style={{ overflowY: "auto" }}>
          {shows.shows.map((show) => (
            <ListItem key={show.id}>
              <ShowItem
                onDelete={() => handleDelete(show)}
                onEdit={() => handleEdit(show)}
                show={show}
              />
            </ListItem>
          ))}
        </List>
      )}
      <Button onClick={onCreate}>{_(msg({ message: "Create" }))}</Button>
    </Stack>
  );
}

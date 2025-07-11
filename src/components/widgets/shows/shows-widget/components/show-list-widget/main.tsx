"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button, Center, Stack, Title } from "@mantine/core";
import { List, ListItem } from "@radio-aktywne/ui";
import { useCallback } from "react";

import { deleteShow } from "../../../../../../actions/beaver/shows/delete-show";
import { useToasts } from "../../../../../../hooks/use-toasts";
import { ShowItem } from "./components/show-item";
import { ShowListWidgetInput } from "./types";

export function ShowListWidget({
  onCreate,
  onDelete,
  onEdit,
  shows,
}: ShowListWidgetInput) {
  const { _ } = useLingui();
  const toasts = useToasts();

  const handleDelete = useCallback(
    async (show: (typeof shows)["shows"][number]) => {
      const { error } = await deleteShow({ id: show.id });

      if (error) toasts.error(_(error));
      else toasts.success(_(msg({ message: "Show deleted." })));

      onDelete?.(show);
    },
    [_, onDelete, toasts],
  );

  const handleEdit = useCallback(
    (show: (typeof shows)["shows"][number]) => {
      onEdit?.(show);
    },
    [onEdit],
  );

  return (
    <Stack mah="100%" w="100%">
      {shows.count === 0 ? (
        <Center>
          <Title>{_(msg({ message: "No shows." }))}</Title>
        </Center>
      ) : (
        <>
          <Center>
            <Title>{_(msg({ message: "Shows" }))}</Title>
          </Center>
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
        </>
      )}
      <Button onClick={onCreate}>{_(msg({ message: "Create" }))}</Button>
    </Stack>
  );
}

"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import {
  Button,
  Center,
  Group,
  Pagination,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import { List, ListItem } from "@radio-aktywne/ui";
import { useCallback } from "react";
import { MdSearch } from "react-icons/md";

import { deleteShow } from "../../../../../../actions/beaver/shows/delete-show";
import { useToasts } from "../../../../../../hooks/use-toasts";
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

  const handlePageChange = useCallback(
    (page: number) => {
      onPageChange?.(page);
    },
    [onPageChange],
  );

  const handleQueryChange = useDebouncedCallback((query: string) => {
    onQueryChange?.(query);
  }, 200);

  return (
    <Stack mah="100%" w="100%">
      <Center>
        <Title>{_(msg({ message: "Shows" }))}</Title>
      </Center>
      <Group gap="xs" w="100%" wrap="nowrap">
        <TextInput
          defaultValue={query}
          onChange={(e) => handleQueryChange(e.currentTarget.value)}
          placeholder={_(msg({ message: "Search shows" }))}
          rightSection={<MdSearch />}
          rightSectionPointerEvents="none"
          w="100%"
        />
        {shows.count > perPage && (
          <Pagination.Root
            onChange={handlePageChange}
            total={Math.ceil(shows.count / perPage)}
            value={page}
          >
            <Group gap="xs" wrap="nowrap">
              <Pagination.Previous />
              <Pagination.Next />
            </Group>
          </Pagination.Root>
        )}
      </Group>
      {shows.count === 0 ? (
        <Center>
          <Text my="xs">{_(msg({ message: "No shows" }))}</Text>
        </Center>
      ) : (
        <>
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

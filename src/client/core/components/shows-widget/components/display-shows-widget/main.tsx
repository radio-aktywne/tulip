import { msg } from "@lingui/core/macro";
import { Button, Stack, Text, Title } from "@mantine/core";
import { List } from "@radio-aktywne/ui";
import { useDeepCompareMemo } from "use-deep-compare";

import type { DisplayShowsWidgetInput } from "./types";

import { useLocalization } from "../../../../../../isomorphic/localization/hooks/use-localization";
import { Controls } from "./components/controls";
import { ShowItem } from "./components/show-item";

export function DisplayShowsWidget({
  limit,
  onCreate,
  onDelete,
  onEdit,
  onPageChange,
  onQueryChange,
  page,
  query,
  shows,
  total,
}: DisplayShowsWidgetInput) {
  const { localization } = useLocalization();

  const showsIds = shows.map((show) => show.id);

  const deleteHandlers = useDeepCompareMemo(
    () => showsIds.map((id) => async () => await onDelete?.(id)),
    [showsIds, onDelete],
  );

  const editHandlers = useDeepCompareMemo(
    () => showsIds.map((id) => () => onEdit?.(id)),
    [showsIds, onEdit],
  );

  return (
    <Stack h="100%" w="100%">
      <Title ta="center">
        {localization.localize(msg({ message: "Shows" }))}
      </Title>
      <Controls
        onPageChange={onPageChange}
        onQueryChange={onQueryChange}
        page={page}
        pages={Math.ceil(total / limit)}
        query={query}
      />
      {total === 0 ? (
        <Text py="sm" size="xs" ta="center">
          {localization.localize(msg({ message: "No shows" }))}
        </Text>
      ) : (
        <List style={{ overflowY: "auto" }}>
          {shows.map((show, index) => (
            <ShowItem
              key={show.id}
              onDelete={deleteHandlers[index]}
              onEdit={editHandlers[index]}
              show={show}
            />
          ))}
        </List>
      )}
      <Button mt="auto" onClick={onCreate} style={{ flexShrink: 0 }}>
        {localization.localize(msg({ message: "Create" }))}
      </Button>
    </Stack>
  );
}

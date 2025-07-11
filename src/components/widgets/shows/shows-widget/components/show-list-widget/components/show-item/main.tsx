import { ActionIcon, Text, UnstyledButton } from "@mantine/core";
import { MdDelete } from "react-icons/md";

import { ShowItemInput } from "./types";

export function ShowItem({ onDelete, onEdit, show }: ShowItemInput) {
  return (
    <>
      <UnstyledButton onClick={onEdit}>
        <Text fw="bold" size="xs">
          {show.title}
        </Text>
      </UnstyledButton>
      <ActionIcon
        color="ra-red"
        disabled={show.events?.length !== 0}
        onClick={onDelete}
        size="auto"
        variant="transparent"
      >
        <MdDelete size="1em" />
      </ActionIcon>
    </>
  );
}

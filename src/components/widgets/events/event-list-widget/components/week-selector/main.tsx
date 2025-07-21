"use client";

import { ActionIcon, Group, Text, UnstyledButton } from "@mantine/core";
import Link from "next/link";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import { WeekSelectorInput } from "./types";

export function WeekSelector({ current }: WeekSelectorInput) {
  const localCurrent = current.local();

  const weekStart = localCurrent.startOf("week");
  const weekEnd = localCurrent.endOf("week");

  return (
    <Group justify="space-between" w="100%">
      <ActionIcon
        component={Link}
        href={{
          pathname: "/events",
          query: {
            current: localCurrent.subtract(1, "week").format("YYYY-MM-DD"),
          },
        }}
      >
        <MdKeyboardArrowLeft size="2em" />
      </ActionIcon>
      <UnstyledButton component={Link} href="/events">
        <Text fw="bold" size="sm">
          {weekStart.format("LL")} - {weekEnd.format("LL")}
        </Text>
      </UnstyledButton>
      <ActionIcon
        component={Link}
        href={{
          pathname: "/events",
          query: {
            current: localCurrent.add(1, "week").format("YYYY-MM-DD"),
          },
        }}
      >
        <MdKeyboardArrowRight size="2em" />
      </ActionIcon>
    </Group>
  );
}

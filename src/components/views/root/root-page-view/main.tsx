"use client";

import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Button, Stack } from "@mantine/core";
import Link from "next/link";

import { RootPageViewInput } from "./types";

export function RootPageView({}: RootPageViewInput) {
  const { _ } = useLingui();

  return (
    <Stack>
      <Button component={Link} href="/shows">
        {_(msg({ message: "Shows" }))}
      </Button>
      <Button component={Link} href="/events">
        {_(msg({ message: "Events" }))}
      </Button>
    </Stack>
  );
}

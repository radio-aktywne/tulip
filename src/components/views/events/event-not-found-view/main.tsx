"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Title } from "@mantine/core";

import { EventNotFoundViewInput } from "./types";

export function EventNotFoundView({}: EventNotFoundViewInput) {
  const { _ } = useLingui();

  return <Title>{_(msg({ message: "Event not found." }))}</Title>;
}

"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

import { useDocumentMetadata } from "../../../../../hooks/use-document-metadata";
import { EventNotFoundMetadataInput } from "./types";

export function EventNotFoundMetadata({}: EventNotFoundMetadataInput) {
  const { _ } = useLingui();

  useDocumentMetadata({
    description: _(msg({ message: "tulip" })),
    title: _(msg({ message: "Event not found • tulip" })),
  });

  return null;
}

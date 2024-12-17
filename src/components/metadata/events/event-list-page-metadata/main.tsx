"use client";

import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";

import { useDocumentMetadata } from "../../../../hooks/use-document-metadata";
import { EventListPageMetadataInput } from "./types";

export function EventListPageMetadata({}: EventListPageMetadataInput) {
  const { _ } = useLingui();

  useDocumentMetadata({
    description: _(msg({ message: "tulip" })),
    title: _(msg({ message: "Events • tulip" })),
  });

  return null;
}

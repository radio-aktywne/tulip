"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

import { useDocumentMetadata } from "../../../../../hooks/use-document-metadata";
import { NewEventPageMetadataInput } from "./types";

export function NewEventPageMetadata({}: NewEventPageMetadataInput) {
  const { _ } = useLingui();

  useDocumentMetadata({
    description: _(msg({ message: "tulip" })),
    title: _(msg({ message: "New event • tulip" })),
  });

  return null;
}

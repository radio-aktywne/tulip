"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

import { useDocumentMetadata } from "../../../../../hooks/use-document-metadata";
import { NewShowPageMetadataInput } from "./types";

export function NewShowPageMetadata({}: NewShowPageMetadataInput) {
  const { _ } = useLingui();

  useDocumentMetadata({
    description: _(msg({ message: "tulip" })),
    title: _(msg({ message: "New show • tulip" })),
  });

  return null;
}

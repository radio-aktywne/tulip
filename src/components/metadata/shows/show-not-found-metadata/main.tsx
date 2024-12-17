"use client";

import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";

import { useDocumentMetadata } from "../../../../hooks/use-document-metadata";
import { ShowNotFoundMetadataInput } from "./types";

export function ShowNotFoundMetadata({}: ShowNotFoundMetadataInput) {
  const { _ } = useLingui();

  useDocumentMetadata({
    description: _(msg({ message: "tulip" })),
    title: _(msg({ message: "Show not found • tulip" })),
  });

  return null;
}

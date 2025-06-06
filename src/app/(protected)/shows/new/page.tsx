import { i18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { Metadata } from "next";

import { NewShowPageMetadata } from "../../../../components/metadata/shows/new/new-show-page-metadata";
import { NewShowPageView } from "../../../../components/views/shows/new/new-show-page-view";
import { getLanguage } from "../../../../lib/i18n/get-language";
import { loadLocale } from "../../../../lib/i18n/load-locale";
import { NewShowPageInput } from "./types";

export const dynamic = "force-dynamic";

export async function generateMetadata({}: NewShowPageInput): Promise<Metadata> {
  const { language } = getLanguage();
  await loadLocale({ i18n, language });

  return {
    description: i18n._(msg({ message: "tulip" })),
    title: i18n._(msg({ message: "New show • tulip" })),
  };
}

export default function NewShowPage({}: NewShowPageInput) {
  return (
    <>
      <NewShowPageMetadata />
      <NewShowPageView />
    </>
  );
}

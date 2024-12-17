import { i18n } from "@lingui/core";
import { msg, t } from "@lingui/macro";
import { Metadata } from "next";

import { NewShowPageMetadata } from "../../../components/metadata/shows/new-show-page-metadata";
import { NewShowPageView } from "../../../components/views/shows/new-show-page-view";
import { getLanguage } from "../../../lib/i18n/get-language";
import { loadLocale } from "../../../lib/i18n/load-locale";
import { NewShowPageInput } from "./types";

export const dynamic = "force-dynamic";

export async function generateMetadata({}: NewShowPageInput): Promise<Metadata> {
  const { language } = getLanguage();
  await loadLocale({ i18n, language });

  return {
    description: t(i18n)(msg({ message: "New show • tulip" })),
    title: t(i18n)(msg({ message: "tulip" })),
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

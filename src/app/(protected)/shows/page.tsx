import { i18n } from "@lingui/core";
import { msg, t } from "@lingui/macro";
import { Metadata } from "next";

import { ShowListPageMetadata } from "../../../components/metadata/shows/show-list-page-metadata";
import { ShowListPageView } from "../../../components/views/shows/show-list-page-view";
import { getLanguage } from "../../../lib/i18n/get-language";
import { loadLocale } from "../../../lib/i18n/load-locale";
import { ShowListPageInput } from "./types";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { language } = getLanguage();
  await loadLocale({ i18n, language });

  return {
    description: t(i18n)(msg({ message: "tulip" })),
    title: t(i18n)(msg({ message: "Shows • tulip" })),
  };
}

export default function ShowListPage({}: ShowListPageInput) {
  return (
    <>
      <ShowListPageMetadata />
      <ShowListPageView />
    </>
  );
}

import { i18n } from "@lingui/core";
import { msg, t } from "@lingui/macro";
import { Metadata } from "next";

import { ShowPageMetadata } from "../../../components/metadata/shows/show-page-metadata";
import { ShowPageView } from "../../../components/views/shows/show-page-view";
import { getLanguage } from "../../../lib/i18n/get-language";
import { loadLocale } from "../../../lib/i18n/load-locale";
import { ShowPageInput } from "./types";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ShowPageInput): Promise<Metadata> {
  const id = params.id;

  const { language } = getLanguage();
  await loadLocale({ i18n, language });

  return {
    description: t(i18n)(msg({ message: `Show ${id} • tulip` })),
    title: t(i18n)(msg({ message: "tulip" })),
  };
}

export default function ShowPage({ params }: ShowPageInput) {
  const id = params.id;

  return (
    <>
      <ShowPageMetadata id={id} />
      <ShowPageView id={id} />
    </>
  );
}

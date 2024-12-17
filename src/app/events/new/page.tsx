import { i18n } from "@lingui/core";
import { msg, t } from "@lingui/macro";
import { Metadata } from "next";

import { NewEventPageMetadata } from "../../../components/metadata/events/new-event-page-metadata";
import { NewEventPageView } from "../../../components/views/events/new-event-page-view";
import { getLanguage } from "../../../lib/i18n/get-language";
import { loadLocale } from "../../../lib/i18n/load-locale";
import { NewEventPageInput } from "./types";

export const dynamic = "force-dynamic";

export async function generateMetadata({}: NewEventPageInput): Promise<Metadata> {
  const { language } = getLanguage();
  await loadLocale({ i18n, language });

  return {
    description: t(i18n)(msg({ message: "New event • tulip" })),
    title: t(i18n)(msg({ message: "tulip" })),
  };
}

export default function NewEventPage({}: NewEventPageInput) {
  return (
    <>
      <NewEventPageMetadata />
      <NewEventPageView />
    </>
  );
}

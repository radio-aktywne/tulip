import { i18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { Metadata } from "next";

import { NewEventPageMetadata } from "../../../../../components/metadata/events/new/new-event-page-metadata";
import { NewEventPageView } from "../../../../../components/views/events/new/new-event-page-view";
import { getLanguage } from "../../../../../lib/i18n/get-language";
import { loadLocale } from "../../../../../lib/i18n/load-locale";
import { NewEventPageInput } from "./types";

export const dynamic = "force-dynamic";

export async function generateMetadata({}: NewEventPageInput): Promise<Metadata> {
  const { language } = getLanguage();
  await loadLocale({ i18n, language });

  return {
    description: i18n._(msg({ message: "tulip" })),
    title: i18n._(msg({ message: "New event • tulip" })),
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

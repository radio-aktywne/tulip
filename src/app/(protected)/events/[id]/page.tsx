import { i18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { Metadata } from "next";

import { EventPageMetadata } from "../../../../components/metadata/events/event-page-metadata";
import { EventPageView } from "../../../../components/views/events/event-page-view";
import { getLanguage } from "../../../../lib/i18n/get-language";
import { loadLocale } from "../../../../lib/i18n/load-locale";
import { EventPageInput } from "./types";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: EventPageInput): Promise<Metadata> {
  const id = params.id;

  const { language } = getLanguage();
  await loadLocale({ i18n, language });

  return {
    description: i18n._(msg({ message: "tulip" })),
    title: i18n._(msg({ message: `Event ${id} • tulip` })),
  };
}

export default function EventPage({ params }: EventPageInput) {
  const id = params.id;

  return (
    <>
      <EventPageMetadata id={id} />
      <EventPageView id={id} />
    </>
  );
}

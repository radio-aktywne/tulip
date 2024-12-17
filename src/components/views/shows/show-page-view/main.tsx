import { notFound } from "next/navigation";

import {
  getShow,
  ShowNotFoundError,
} from "../../../../lib/beaver/shows/get-show";
import { ShowWidget } from "../../../widgets/shows/show-widget";
import { ShowPageViewInput } from "./types";

export async function ShowPageView({ id }: ShowPageViewInput) {
  try {
    const { show } = await getShow({ id: id });

    return <ShowWidget show={show} />;
  } catch (error) {
    if (error instanceof ShowNotFoundError) notFound();
    throw error;
  }
}

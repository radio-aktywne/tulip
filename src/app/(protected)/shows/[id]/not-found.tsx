import { ShowNotFoundMetadata } from "../../../../components/metadata/shows/show/show-not-found-metadata";
import { ShowNotFoundView } from "../../../../components/views/shows/show/show-not-found-view";
import { ShowNotFoundInput } from "./types";

export const dynamic = "force-dynamic";

export default function ShowNotFound({}: ShowNotFoundInput) {
  return (
    <>
      <ShowNotFoundMetadata />
      <ShowNotFoundView />
    </>
  );
}

import { ShowNotFoundMetadata } from "../../../components/metadata/shows/show-not-found-metadata";
import { ShowNotFoundView } from "../../../components/views/shows/show-not-found-view";
import { ShowNotFoundInput } from "./types";

export default function ShowNotFound({}: ShowNotFoundInput) {
  return (
    <>
      <ShowNotFoundMetadata />
      <ShowNotFoundView />
    </>
  );
}

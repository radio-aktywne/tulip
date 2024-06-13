import { notFound } from "next/navigation";
import { getShow } from "../../../actions";
import { ShowWidget } from "../../../components";

type ShowPageParams = Readonly<{
  id: string;
}>;

export type ShowPageProps = Readonly<{
  params: ShowPageParams;
}>;

export const dynamic = "force-dynamic";

export default async function ShowPage({ params }: ShowPageProps) {
  const { data: show, error } = await getShow({ id: params.id });

  if (error !== undefined) throw new Error(error);
  if (show === undefined) notFound();

  return <ShowWidget show={show} />;
}

"use client";

import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

import { deleteShow } from "../../../../actions/beaver/shows/delete-show";
import { updateShow } from "../../../../actions/beaver/shows/update-show";
import { useGetShow } from "../../../../hooks/beaver/shows/use-get-show";
import { useToasts } from "../../../../hooks/use-toasts";
import { EditShowForm, EditShowFormData } from "./components/edit-show-form";
import { ShowWidgetInput } from "./types";

export function ShowWidget({ show: prefetchedShow }: ShowWidgetInput) {
  const router = useRouter();

  const { _ } = useLingui();
  const toasts = useToasts();

  const { data: currentShow, error } = useGetShow({
    id: prefetchedShow.id,
  });
  const show = currentShow ?? prefetchedShow;

  const initialData = {
    description: show.description ?? undefined,
    title: show.title,
  };

  useEffect(() => {
    if (error) toasts.warning(_(error));
  }, [_, error, toasts]);

  const handleSaveAfterValidation = useCallback(
    async (title: string, description: string | undefined) => {
      const { error: updateError } = await updateShow({
        data: { description: description ?? null, title: title },
        id: show.id,
      });

      if (updateError) {
        const translated = _(updateError);
        toasts.error(translated);
        router.refresh();
        return { description: translated, title: translated };
      }

      toasts.success(_(msg({ message: "Show updated successfully" })));
      router.refresh();
    },
    [_, show, router, toasts],
  );

  const handleSave = useCallback(
    async (data: EditShowFormData) => {
      if (!data.title)
        return { title: _(msg({ message: "Title is required" })) };

      return handleSaveAfterValidation(data.title, data.description);
    },
    [_, handleSaveAfterValidation],
  );

  const handleDelete = useCallback(async () => {
    const { error: deleteError } = await deleteShow({ id: show.id });

    if (deleteError) {
      toasts.error(_(deleteError));
      router.refresh();
    } else {
      toasts.success(_(msg({ message: "Show deleted successfully" })));
      router.push("/shows");
    }
  }, [_, show, router, toasts]);

  return (
    <EditShowForm
      initialData={initialData}
      onDelete={handleDelete}
      onSave={handleSave}
    />
  );
}

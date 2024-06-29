"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { UpdateShowProps, deleteShow, updateShow } from "../../../actions";
import { labels } from "../../../config/labels";
import { useShow, useToasts } from "../../../hooks";
import { ShowForm, ShowFormData } from "./ShowForm";
import { ShowWidgetProps } from "./ShowWidget.types";

export function ShowWidget({ show: prefetchedShow }: ShowWidgetProps) {
  const router = useRouter();

  const { show: currentShow, fetchShow } = useShow({
    id: prefetchedShow.id,
    include: { events: prefetchedShow.events != null },
  });
  const show = currentShow ?? prefetchedShow;

  const { success, error } = useToasts();

  const handleUpdate = useCallback(
    async (update: UpdateShowProps["update"]) => {
      const { data: updatedShow, error: message } = await updateShow({
        id: show.id,
        update,
      });

      if (message !== undefined) {
        error(labels.widgets.show.toasts.update.error(show.id));
        return message;
      }

      success(labels.widgets.show.toasts.update.success(show.id));

      await fetchShow();

      if (updatedShow.id === show.id) router.refresh();
      else router.push(`/shows/${updatedShow.id}`);
    },
    [show.id, error, success, fetchShow, router],
  );

  const handleSave = useCallback(
    async (data: ShowFormData) => {
      if (data.title === undefined || data.title === "")
        return {
          title: labels.widgets.show.form.fields.title.errors.missing,
        };

      const message = await handleUpdate({
        title: data.title,
        description: data.description || null,
      });

      return message ? { title: message, description: message } : null;
    },
    [handleUpdate],
  );

  const handleDelete = useCallback(async () => {
    const { error: message } = await deleteShow({ id: show.id });
    if (message) error(message);
    else {
      success(labels.widgets.show.toasts.delete.success(show.id));
      router.push("/shows");
    }
  }, [show.id, error, success, router]);

  return (
    <ShowForm
      values={{
        title: show.title,
        description: show.description ?? "",
      }}
      labels={labels.widgets.show.form}
      onSave={handleSave}
      onDelete={handleDelete}
    />
  );
}

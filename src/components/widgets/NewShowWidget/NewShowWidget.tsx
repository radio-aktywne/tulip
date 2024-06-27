"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { CreateShowProps, createShow } from "../../../actions";
import { labels } from "../../../config/labels";
import { useToasts } from "../../../hooks";
import { NewShowWidgetProps } from "./NewShowWidget.types";
import { ShowForm, ShowFormData } from "./ShowForm";

export function NewShowWidget({}: NewShowWidgetProps) {
  const router = useRouter();

  const { success, error } = useToasts();

  const handleNormalizedCreate = useCallback(
    async (data: CreateShowProps) => {
      const { data: show, error: message } = await createShow(data);

      if (message !== undefined) {
        error(labels.widgets.newShow.toasts.create.error);
        return message;
      }

      success(labels.widgets.newShow.toasts.create.success(show.id));
      router.push(`/shows/${show.id}`);
    },
    [error, success, router],
  );

  const handleCreate = useCallback(
    async (data: ShowFormData) => {
      if (!data.title)
        return {
          title: labels.widgets.newShow.form.fields.title.errors.missing,
        };

      const message = await handleNormalizedCreate({
        title: data.title,
        description: data.description || null,
      });

      return message ? { title: message, description: message } : null;
    },
    [handleNormalizedCreate],
  );

  return (
    <ShowForm labels={labels.widgets.newShow.form} onCreate={handleCreate} />
  );
}

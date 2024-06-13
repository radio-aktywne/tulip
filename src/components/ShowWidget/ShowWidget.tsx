"use client";

import { Button, Stack } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { validate as validateUUID } from "uuid";
import { UpdateShowProps, deleteShow, updateShow } from "../../actions";
import { labels } from "../../config/labels";
import { useShow, useToasts } from "../../hooks";
import { ShowWidgetProps } from "./ShowWidget.types";
import { TextField, TextareaField } from "./fields";

export function ShowWidget({ show: prefetchedShow }: ShowWidgetProps) {
  const router = useRouter();

  const { show: currentShow, fetchShow } = useShow({
    id: prefetchedShow.id,
    include: { events: prefetchedShow.events != null },
  });
  const show = currentShow ?? prefetchedShow;

  const { success, error } = useToasts();

  const validateId = useCallback((value: string | undefined) => {
    if (!value) return labels.widgets.show.fields.id.errors.missing;

    if (!validateUUID(value))
      return labels.widgets.show.fields.id.errors.format;
  }, []);

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

      await fetchShow();
      success(labels.widgets.show.toasts.update.success(show.id));

      if (updatedShow.id !== show.id) router.push(`/shows/${updatedShow.id}`);
    },
    [show.id, fetchShow, error, success, router],
  );

  const handleUpdateId = useCallback(
    async (id: string | undefined) => {
      if (!id) return labels.widgets.show.fields.id.errors.missing;

      return await handleUpdate({ id });
    },
    [handleUpdate],
  );

  const handleUpdateTitle = useCallback(
    async (title: string | undefined) => {
      if (!title) return labels.widgets.show.fields.title.errors.missing;

      return await handleUpdate({ title });
    },
    [handleUpdate],
  );

  const handleUpdateDescription = useCallback(
    async (description: string | undefined) =>
      await handleUpdate({ description: description || null }),
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
    <Stack>
      <TextField
        title={labels.widgets.show.fields.id.title}
        value={show.id}
        required={true}
        validate={validateId}
        onUpdate={handleUpdateId}
      />
      <TextField
        title={labels.widgets.show.fields.title.title}
        value={show.title}
        required={true}
        onUpdate={handleUpdateTitle}
      />
      <TextareaField
        title={labels.widgets.show.fields.description.title}
        value={show.description ?? undefined}
        fallback={labels.widgets.show.fields.description.empty}
        onUpdate={handleUpdateDescription}
      />
      <Button color="red" onClick={handleDelete}>
        {labels.widgets.show.buttons.delete.label}
      </Button>
    </Stack>
  );
}

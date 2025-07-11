"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button, Stack } from "@mantine/core";
import router from "next/router";
import { useCallback } from "react";

import { updateShow } from "../../../../../../actions/beaver/shows/update-show";
import { useToasts } from "../../../../../../hooks/use-toasts";
import { EditShowForm, EditShowFormData } from "./components/edit-show-form";
import { EditShowWidgetInput } from "./types";

export function EditShowWidget({
  onCancel,
  onSave,
  show,
}: EditShowWidgetInput) {
  const { _ } = useLingui();
  const toasts = useToasts();

  const initialData = {
    description: show.description ?? undefined,
    title: show.title,
  };

  const handleSaveAfterValidation = useCallback(
    async (title: string, description: string | undefined) => {
      const { error: updateError } = await updateShow({
        data: { description: description ?? null, title: title },
        id: show.id,
      });

      if (updateError) {
        const translated = _(updateError);
        toasts.error(translated);
        return { description: translated, title: translated };
      }

      toasts.success(_(msg({ message: "Show updated successfully" })));
      onSave?.();
    },
    [_, onSave, show, router, toasts],
  );

  const handleSave = useCallback(
    async (data: EditShowFormData) => {
      if (!data.title)
        return { title: _(msg({ message: "Title is required" })) };

      return handleSaveAfterValidation(data.title, data.description);
    },
    [_, handleSaveAfterValidation],
  );

  return (
    <Stack align="center">
      <EditShowForm initialData={initialData} onSave={handleSave} />
      <Stack w="100%">
        <Button color="ra-red" onClick={onCancel}>
          {_(msg({ message: "Cancel" }))}
        </Button>
      </Stack>
    </Stack>
  );
}

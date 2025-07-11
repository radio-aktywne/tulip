"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button, Stack } from "@mantine/core";
import { useCallback } from "react";

import { createShow } from "../../../../../../actions/beaver/shows/create-show";
import { useToasts } from "../../../../../../hooks/use-toasts";
import {
  CreateShowForm,
  CreateShowFormData,
} from "./components/create-show-form";
import { NewShowWidgetInput } from "./types";

export function NewShowWidget({ onCancel, onCreate }: NewShowWidgetInput) {
  const { _ } = useLingui();
  const toasts = useToasts();

  const handleCreateAfterValidation = useCallback(
    async (title: string, description: string | undefined) => {
      const { error: createError } = await createShow({
        description: description,
        title: title,
      });

      if (createError) {
        const translated = _(createError);
        toasts.error(translated);
        return { description: translated, title: translated };
      }

      toasts.success(_(msg({ message: "Show created successfully" })));
      onCreate?.();
    },
    [_, onCreate, toasts],
  );

  const handleCreate = useCallback(
    async (data: CreateShowFormData) => {
      if (!data.title)
        return { title: _(msg({ message: "Title is required" })) };

      return handleCreateAfterValidation(data.title, data.description);
    },
    [_, handleCreateAfterValidation],
  );

  return (
    <Stack align="center">
      <CreateShowForm onCreate={handleCreate} />
      <Stack w="100%">
        <Button color="ra-red" onClick={onCancel}>
          {_(msg({ message: "Cancel" }))}
        </Button>
      </Stack>
    </Stack>
  );
}

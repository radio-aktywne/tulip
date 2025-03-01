"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { createShow } from "../../../../actions/beaver/shows/create-show";
import { useToasts } from "../../../../hooks/use-toasts";
import {
  CreateShowForm,
  CreateShowFormData,
} from "./components/create-show-form";
import { NewShowWidgetInput } from "./types";

export function NewShowWidget({}: NewShowWidgetInput) {
  const router = useRouter();

  const { _ } = useLingui();
  const toasts = useToasts();

  const handleCreateAfterValidation = useCallback(
    async (title: string, description: string | undefined) => {
      const { data: show, error: createError } = await createShow({
        description: description,
        title: title,
      });

      if (createError) {
        const translated = _(createError);
        toasts.error(translated);
        router.refresh();
        return { description: translated, title: translated };
      }

      toasts.success(_(msg({ message: "Show created successfully" })));
      router.push(`/shows/${show.id}`);
    },
    [_, router, toasts],
  );

  const handleCreate = useCallback(
    async (data: CreateShowFormData) => {
      if (!data.title)
        return { title: _(msg({ message: "Title is required" })) };

      return handleCreateAfterValidation(data.title, data.description);
    },
    [_, handleCreateAfterValidation],
  );

  return <CreateShowForm onCreate={handleCreate} />;
}

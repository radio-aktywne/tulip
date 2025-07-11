"use client";

import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Button, Stack, TextInput } from "@mantine/core";
import { useCallback, useState } from "react";

import {
  useShowForm,
  UseShowFormValues,
} from "../../../../../../../../hooks/forms/use-show-form";
import { CreateShowFormInput } from "./types";

export function CreateShowForm({ onCreate, validate }: CreateShowFormInput) {
  const [creating, setCreating] = useState(false);

  const { _ } = useLingui();

  const { form } = useShowForm({ validate: validate });

  const formSetErrors = form.setErrors;

  const handleCreate = useCallback(
    async (data: UseShowFormValues) => {
      setCreating(true);
      try {
        const errors = await onCreate?.(data);
        if (errors) formSetErrors(errors);
      } finally {
        setCreating(false);
      }
    },
    [formSetErrors, onCreate],
  );

  return (
    <form onSubmit={form.onSubmit(handleCreate)}>
      <Stack>
        <TextInput
          label={_(msg({ message: "Title" }))}
          required={true}
          {...form.getInputProps("title")}
        />
        <TextInput
          label={_(msg({ message: "Description" }))}
          required={false}
          {...form.getInputProps("description")}
        />
        <Button loading={creating} type="submit">
          {_(msg({ message: "Create" }))}
        </Button>
      </Stack>
    </form>
  );
}

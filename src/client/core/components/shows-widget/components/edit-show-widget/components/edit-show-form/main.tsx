import { msg } from "@lingui/core/macro";
import { Button, TextInput } from "@mantine/core";

import type { EditShowFormInput } from "./types";

import { useForm } from "../../../../../../../../isomorphic/core/hooks/use-form";
import { useLocalization } from "../../../../../../../../isomorphic/localization/hooks/use-localization";
import { Schemas } from "./schemas";

export function EditShowForm({
  initialValues,
  onError,
  onSubmit,
}: EditShowFormInput) {
  const { localization } = useLocalization();

  const { form, handleFormSubmit, submitting } = useForm({
    initialValues: initialValues,
    onError: onError,
    onSubmit: onSubmit,
    schema: Schemas.Values,
  });

  return (
    <form onSubmit={handleFormSubmit} style={{ display: "contents" }}>
      <TextInput
        key={form.key("title")}
        label={localization.localize(msg({ message: "Title" }))}
        placeholder={localization.localize(
          msg({ message: "Enter show title" }),
        )}
        required={true}
        {...form.getInputProps("title")}
      />
      <TextInput
        key={form.key("description")}
        label={localization.localize(msg({ message: "Description" }))}
        placeholder={localization.localize(
          msg({ message: "Enter show description" }),
        )}
        required={false}
        {...form.getInputProps("description")}
      />
      <Button
        loading={submitting}
        mt="auto"
        style={{ flexShrink: 0 }}
        type="submit"
      >
        {localization.localize(msg({ message: "Save" }))}
      </Button>
    </form>
  );
}

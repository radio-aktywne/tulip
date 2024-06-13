"use client";

import { Box } from "@mantine/core";
import { clsx } from "clsx";
import { useCallback, useState } from "react";
import { FieldProps } from "./Field.types";
import { FieldDisplay } from "./FieldDisplay";
import { FieldEdit } from "./FieldEdit";

import classes from "./Field.module.css";

export function Field<V>({
  title,
  value,
  required,
  renderDisplay,
  renderInput,
  validate,
  onUpdate,
}: FieldProps<V>) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = useCallback(() => setIsEditing(true), []);

  const handleSave = useCallback(
    async (newValue: V) => {
      if (newValue !== value) {
        const error = await onUpdate?.(newValue);
        if (error != null) return error;
      }
      setIsEditing(false);
    },
    [value, onUpdate],
  );

  const handleCancel = useCallback(() => setIsEditing(false), []);

  return (
    <Box display="grid">
      {isEditing && (
        <Box className={classes.stack}>
          <FieldEdit
            title={title}
            value={value}
            required={required}
            render={renderInput}
            validate={validate}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </Box>
      )}
      <Box
        className={clsx(classes.stack, isEditing ? classes.hidden : undefined)}
      >
        <FieldDisplay
          title={title}
          value={value}
          render={renderDisplay}
          onEdit={handleEdit}
        />
      </Box>
    </Box>
  );
}

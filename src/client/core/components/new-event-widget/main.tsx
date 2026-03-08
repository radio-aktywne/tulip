"use client";

import { msg } from "@lingui/core/macro";
import { Button, Stack, Title } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import type { NewEventWidgetInput } from "./types";

import { getValidationIssue } from "../../../../common/orpc/lib/get-validation-issue";
import { isOrpcDefinedError } from "../../../../common/orpc/lib/is-orpc-defined-error";
import { useLocalization } from "../../../../isomorphic/localization/hooks/use-localization";
import { useNotifications } from "../../../../isomorphic/notifications/hooks/use-notifications";
import { orpcClientSideQueryClient } from "../../../orpc/vars/clients";
import {
  CreateEventForm,
  type CreateEventFormSubmitInput,
} from "./components/create-event-form";

export function NewEventWidget({}: NewEventWidgetInput) {
  const [creating, setCreating] = useState(false);

  const router = useRouter();

  const { localization } = useLocalization();
  const { notifications } = useNotifications();

  const eventsCreateMutation = useMutation(
    orpcClientSideQueryClient.core.events.create.mutationOptions(),
  );

  const handleCreate = useCallback(
    async ({ values }: CreateEventFormSubmitInput) => {
      if (creating) return;

      if (!values.type) {
        notifications.error({ message: msg({ message: "Invalid input" }) });
        return { errors: { type: msg({ message: "Type is required" }) } };
      }

      if (!values.show) {
        notifications.error({ message: msg({ message: "Invalid input" }) });
        return { errors: { show: msg({ message: "Show is required" }) } };
      }

      if (!values.start) {
        notifications.error({ message: msg({ message: "Invalid input" }) });

        return {
          errors: { start: msg({ message: "Start time is required" }) },
        };
      }

      if (!values.end) {
        notifications.error({ message: msg({ message: "Invalid input" }) });
        return { errors: { end: msg({ message: "End time is required" }) } };
      }

      if (
        values.recurrence.recurring === "yes" &&
        !values.recurrence.frequency
      ) {
        notifications.error({ message: msg({ message: "Invalid input" }) });

        return {
          errors: {
            "recurrence.frequency": msg({
              message: "Recurrence frequency is required",
            }),
          },
        };
      }

      if (
        values.recurrence.recurring === "yes" &&
        !values.recurrence.interval
      ) {
        notifications.error({ message: msg({ message: "Invalid input" }) });

        return {
          errors: {
            "recurrence.interval": msg({
              message: "Recurrence interval is required",
            }),
          },
        };
      }

      if (values.recurrence.recurring === "yes" && !values.recurrence.ending) {
        notifications.error({ message: msg({ message: "Invalid input" }) });

        return {
          errors: {
            "recurrence.ending.ends": msg({
              message: "Recurrence ending condition is required",
            }),
          },
        };
      }

      if (
        values.recurrence.recurring === "yes" &&
        values.recurrence.ending?.ends === "on" &&
        !values.recurrence.ending.date
      ) {
        notifications.error({ message: msg({ message: "Invalid input" }) });

        return {
          errors: {
            "recurrence.ending.date": msg({
              message: "Recurrence end date is required",
            }),
          },
        };
      }

      if (
        values.recurrence.recurring === "yes" &&
        values.recurrence.ending?.ends === "after" &&
        !values.recurrence.ending.times
      ) {
        notifications.error({ message: msg({ message: "Invalid input" }) });

        return {
          errors: {
            "recurrence.ending.times": msg({
              message: "Recurrence end times is required",
            }),
          },
        };
      }

      setCreating(true);

      try {
        const event = await eventsCreateMutation.mutateAsync({
          data: {
            end: values.end.replace(" ", "T"),
            recurrence:
              values.recurrence.recurring === "yes" &&
              values.recurrence.frequency &&
              values.recurrence.interval &&
              values.recurrence.ending
                ? {
                    rule: {
                      count:
                        values.recurrence.ending.ends === "after"
                          ? values.recurrence.ending.times
                          : undefined,
                      frequency: values.recurrence.frequency,
                      interval: values.recurrence.interval,
                      until:
                        values.recurrence.ending.ends === "on"
                          ? values.recurrence.ending.date?.replace(" ", "T")
                          : undefined,
                    },
                  }
                : null,
            showId: values.show,
            start: values.start.replace(" ", "T"),
            timezone: values.timezone,
            type: values.type,
          },
        });

        notifications.success({
          message: msg({ message: "Event created" }),
        });

        router.push("/events");

        return {
          values: {
            end: event.end.replace("T", " "),
            recurrence:
              event.recurrence?.rule?.interval &&
              (event.recurrence.rule.frequency == "daily" ||
                event.recurrence.rule.frequency == "weekly" ||
                event.recurrence.rule.frequency == "monthly" ||
                event.recurrence.rule.frequency == "yearly")
                ? {
                    ending: event.recurrence.rule.count
                      ? {
                          ends: "after" as const,
                          times: event.recurrence.rule.count,
                        }
                      : event.recurrence.rule.until
                        ? {
                            date: event.recurrence.rule.until.replace("T", " "),
                            ends: "on" as const,
                          }
                        : {
                            ends: "never" as const,
                          },
                    frequency: event.recurrence.rule.frequency,
                    interval: event.recurrence.rule.interval,
                    recurring: "yes" as const,
                  }
                : { recurring: "no" as const },
            show: event.showId,
            start: event.start.replace("T", " "),
            timezone: event.timezone,
            type: event.type,
          },
        };
      } catch (error) {
        if (isOrpcDefinedError(error)) {
          if (error.code === "BAD_REQUEST") {
            notifications.error({ message: msg({ message: "Invalid input" }) });

            return {
              errors: {
                end: getValidationIssue({
                  error: error,
                  path: "data.end",
                }).message,
                "recurrence.ending.date": getValidationIssue({
                  error: error,
                  path: "data.recurrence.rule.until",
                }).message,
                "recurrence.ending.times": getValidationIssue({
                  error: error,
                  path: "data.recurrence.rule.count",
                }).message,
                "recurrence.frequency": getValidationIssue({
                  error: error,
                  path: "data.recurrence.rule.frequency",
                }).message,
                "recurrence.interval": getValidationIssue({
                  error: error,
                  path: "data.recurrence.rule.interval",
                }).message,
                show: getValidationIssue({
                  error: error,
                  path: "data.showId",
                }).message,
                start: getValidationIssue({
                  error: error,
                  path: "data.start",
                }).message,
                timezone: getValidationIssue({
                  error: error,
                  path: "data.timezone",
                }).message,
                type: getValidationIssue({
                  error: error,
                  path: "data.type",
                }).message,
              },
            };
          }

          if (error.code === "CONFLICT") {
            notifications.error({
              message: msg({ message: "Conflicting input" }),
            });

            return;
          }
        }

        notifications.error({
          message: msg({ message: "An unexpected error occurred" }),
        });

        throw error;
      } finally {
        setCreating(false);
      }
    },
    [
      creating,
      eventsCreateMutation.mutateAsync,
      notifications.error,
      notifications.success,
      router,
    ],
  );

  const handleError = useCallback(() => {
    notifications.error({ message: msg({ message: "Invalid input" }) });
  }, [notifications.error]);

  const initialValues = useMemo(
    () => ({
      recurrence: { recurring: "no" as const },
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }),
    [],
  );

  return (
    <Stack h="100%" w="100%">
      <Title ta="center">
        {localization.localize(msg({ message: "Create event" }))}
      </Title>
      <CreateEventForm
        initialValues={initialValues}
        onError={handleError}
        onSubmit={handleCreate}
      />
      <Button
        color="gray"
        component={Link}
        disabled={creating}
        href="/events"
        style={{ flexShrink: 0 }}
        variant="light"
      >
        {localization.localize(msg({ message: "Back" }))}
      </Button>
    </Stack>
  );
}

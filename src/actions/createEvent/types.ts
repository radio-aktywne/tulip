import { components } from "../../api/emishows";

export type CreateEventType = components["schemas"]["EventCreateInput"]["type"];

export type CreateEventRecurrenceRuleFrequency =
  components["schemas"]["RecurrenceRule"]["frequency"];

export type CreateEventRecurrenceRule = {
  frequency: CreateEventRecurrenceRuleFrequency;
  interval?: null | number;
  count?: null | number;
  until?: null | Date;
};

export type CreateEventRecurrence = {
  rule?: null | CreateEventRecurrenceRule;
};

export type CreateEventProps = {
  id?: string;
  show: string;
  type: components["schemas"]["EventCreateInput"]["type"];
  start: Date;
  end: Date;
  timezone: string;
  recurrence?: null | CreateEventRecurrence;
};

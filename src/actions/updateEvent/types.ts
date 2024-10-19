import { components } from "../../api/beaver";

export type UpdateEventType = components["schemas"]["EventCreateInput"]["type"];

export type UpdateEventRecurrenceRuleFrequency =
  components["schemas"]["events_models_RecurrenceRule"]["frequency"];

export type UpdateEventRecurrenceRule = {
  frequency: UpdateEventRecurrenceRuleFrequency;
  interval?: null | number;
  count?: null | number;
  until?: null | Date;
};

export type UpdateEventRecurrence = {
  rule?: null | UpdateEventRecurrenceRule;
};

export type UpdateEventProps = {
  id: string;
  update: {
    id?: string;
    show?: string;
    type?: components["schemas"]["EventCreateInput"]["type"];
    start?: Date;
    end?: Date;
    timezone?: string;
    recurrence?: null | UpdateEventRecurrence;
  };
};

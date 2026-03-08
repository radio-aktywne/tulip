import type { CalendarItemInput } from "@radio-aktywne/ui";
import type { SetNonNullable } from "type-fest";

import type {
  EventInstance,
  ScheduleModelsEvent,
} from "../../../../../../common/apis/beaver/types";

export type EventInstanceItemInput = Omit<
  CalendarItemInput,
  "end" | "start"
> & {
  event: SetNonNullable<ScheduleModelsEvent, "show">;
  instance: EventInstance;
};

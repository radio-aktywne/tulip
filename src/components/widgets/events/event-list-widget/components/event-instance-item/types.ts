import { CalendarItemInput } from "@radio-aktywne/ui";

import { ListSchedulesOutput } from "../../../../../../lib/beaver/schedules/list-schedules";

export type EventInstanceItemInput = {
  event: ListSchedulesOutput["schedules"]["schedules"][number]["event"];
  instance: ListSchedulesOutput["schedules"]["schedules"][number]["instances"][number];
} & Omit<CalendarItemInput, "end" | "start">;

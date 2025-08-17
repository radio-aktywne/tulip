import {
  ListSchedulesInput,
  ListSchedulesOutput,
} from "../../../../lib/beaver/schedules/list-schedules";

export type EventListWidgetInput = {
  current: string;
  schedules: ListSchedulesOutput["schedules"];
} & ListSchedulesInput;

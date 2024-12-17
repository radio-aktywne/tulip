import { MessageDescriptor } from "@lingui/core";

import {
  CreateEventInput as InternalCreateEventInput,
  CreateEventOutput as InternalCreateEventOutput,
} from "../../../../lib/beaver/events/create-event";

export type CreateEventInput = {
  end: InternalCreateEventInput["end"];
  id?: InternalCreateEventInput["id"];
  recurrence?: InternalCreateEventInput["recurrence"];
  show: InternalCreateEventInput["show"];
  start: InternalCreateEventInput["start"];
  timezone: InternalCreateEventInput["timezone"];
  type: InternalCreateEventInput["type"];
};

export type CreateEventSuccessOutput = {
  data: InternalCreateEventOutput["event"];
  error?: never;
};

export type CreateEventErrorOutput = {
  data?: never;
  error: MessageDescriptor;
};

export type CreateEventOutput =
  | CreateEventErrorOutput
  | CreateEventSuccessOutput;

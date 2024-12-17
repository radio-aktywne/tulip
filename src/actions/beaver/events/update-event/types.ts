import { MessageDescriptor } from "@lingui/core";

import {
  UpdateEventInput as InternalUpdateEventInput,
  UpdateEventOutput as InternalUpdateEventOutput,
} from "../../../../lib/beaver/events/update-event";

export type UpdateEventInput = {
  data: InternalUpdateEventInput["data"];
  id: InternalUpdateEventInput["id"];
};

export type UpdateEventSuccessOutput = {
  data: InternalUpdateEventOutput["event"];
  error?: never;
};

export type UpdateEventErrorOutput = {
  data?: never;
  error: MessageDescriptor;
};

export type UpdateEventOutput =
  | UpdateEventErrorOutput
  | UpdateEventSuccessOutput;

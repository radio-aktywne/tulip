import { MessageDescriptor } from "@lingui/core";

import { DeleteEventInput as InternalDeleteEventInput } from "../../../../lib/beaver/events/delete-event";

export type DeleteEventInput = {
  id: InternalDeleteEventInput["id"];
};

export type DeleteEventSuccessOutput = {
  error?: never;
};

export type DeleteEventErrorOutput = {
  error: MessageDescriptor;
};

export type DeleteEventOutput =
  | DeleteEventErrorOutput
  | DeleteEventSuccessOutput;

import { MessageDescriptor } from "@lingui/core";

import { DeleteShowInput as InternalDeleteShowInput } from "../../../../lib/beaver/shows/delete-show";

export type DeleteShowInput = {
  id: InternalDeleteShowInput["id"];
};

export type DeleteShowSuccessOutput = {
  error?: never;
};

export type DeleteShowErrorOutput = {
  error: MessageDescriptor;
};

export type DeleteShowOutput = DeleteShowErrorOutput | DeleteShowSuccessOutput;

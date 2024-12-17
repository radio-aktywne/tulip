import { MessageDescriptor } from "@lingui/core";

import {
  UpdateShowInput as InternalUpdateShowInput,
  UpdateShowOutput as InternalUpdateShowOutput,
} from "../../../../lib/beaver/shows/update-show";

export type UpdateShowInput = {
  data: InternalUpdateShowInput["data"];
  id: InternalUpdateShowInput["id"];
};

export type UpdateShowSuccessOutput = {
  data: InternalUpdateShowOutput["show"];
  error?: never;
};

export type UpdateShowErrorOutput = {
  data?: never;
  error: MessageDescriptor;
};

export type UpdateShowOutput = UpdateShowErrorOutput | UpdateShowSuccessOutput;

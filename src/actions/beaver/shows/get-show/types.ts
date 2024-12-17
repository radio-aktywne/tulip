import { MessageDescriptor } from "@lingui/core";

import {
  GetShowInput as InternalGetShowInput,
  GetShowOutput as InternalGetShowOutput,
} from "../../../../lib/beaver/shows/get-show";

export type GetShowInput = {
  id: InternalGetShowInput["id"];
  include?: InternalGetShowInput["include"];
};

export type GetShowSuccessOutput = {
  data: InternalGetShowOutput["show"];
  error?: never;
};

export type GetShowErrorOutput = {
  data?: never;
  error: MessageDescriptor;
};

export type GetShowOutput = GetShowErrorOutput | GetShowSuccessOutput;

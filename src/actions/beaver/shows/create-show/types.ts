import { MessageDescriptor } from "@lingui/core";

import {
  CreateShowInput as InternalCreateShowInput,
  CreateShowOutput as InternalCreateShowOutput,
} from "../../../../lib/beaver/shows/create-show";

export type CreateShowInput = {
  description?: InternalCreateShowInput["description"];
  id?: InternalCreateShowInput["id"];
  title: InternalCreateShowInput["title"];
};

export type CreateShowSuccessOutput = {
  data: InternalCreateShowOutput["show"];
  error?: never;
};

export type CreateShowErrorOutput = {
  data?: never;
  error: MessageDescriptor;
};

export type CreateShowOutput = CreateShowErrorOutput | CreateShowSuccessOutput;

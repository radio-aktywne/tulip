import { MessageDescriptor } from "@lingui/core";

import {
  GetShowInput,
  GetShowOutput,
} from "../../../../lib/beaver/shows/get-show";

export type UseGetShowInput = {
  id: GetShowInput["id"];
  include?: GetShowInput["include"];
  interval?: number;
};

export type UseGetShowLoadingState = {
  data?: never;
  error?: never;
  loading: true;
};

export type UseGetShowErrorState = {
  data?: never;
  error: MessageDescriptor;
  loading: false;
};

export type UseGetShowSuccessState = {
  data: GetShowOutput["show"];
  error?: never;
  loading: false;
};

export type UseGetShowState =
  | UseGetShowErrorState
  | UseGetShowLoadingState
  | UseGetShowSuccessState;

export type UseGetShowOutput = {
  refresh: () => Promise<void>;
} & UseGetShowState;

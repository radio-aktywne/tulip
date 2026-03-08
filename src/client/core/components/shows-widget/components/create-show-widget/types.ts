import type {
  CreateShowFormOnSubmit,
  CreateShowFormSubmitInput,
} from "./components/create-show-form";

export type CreateShowWidgetCreateInput = CreateShowFormSubmitInput;

export type CreateShowWidgetInput = {
  onBack?: () => void;
  onCreate: CreateShowFormOnSubmit;
};

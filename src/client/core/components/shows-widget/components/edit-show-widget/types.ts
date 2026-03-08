import type { ShowsModelsShow } from "../../../../../../common/apis/beaver/types";
import type {
  EditShowFormOnSubmit,
  EditShowFormSubmitInput,
} from "./components/edit-show-form";

export type EditShowWidgetSaveInput = EditShowFormSubmitInput;

export type EditShowWidgetInput = {
  onBack?: () => void;
  onSave: EditShowFormOnSubmit;
  show: Omit<ShowsModelsShow, "events">;
};

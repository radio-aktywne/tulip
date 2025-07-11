import { GetShowOutput } from "../../../../../../lib/beaver/shows/get-show";

export type EditShowWidgetInput = {
  onCancel?: () => void;
  onSave?: () => void;
  show: GetShowOutput["show"];
};

import {
  UseEventFormInitialValues,
  UseEventFormValidators,
  UseEventFormValues,
} from "../../../../../../hooks/forms/use-event-form";
import { ListShowsOutput } from "../../../../../../lib/beaver/shows/list-shows";

export type EditEventFormInitialData = UseEventFormInitialValues;

export type EditEventFormData = UseEventFormValues;

export type EditEventFormErrors = {
  [K in keyof UseEventFormValues]?: string;
};

export type EditEventFormValidators = UseEventFormValidators;

export type EditEventFormInput = {
  initialData: EditEventFormInitialData;
  onSave?: (
    data: EditEventFormData,
  ) => Promise<EditEventFormErrors | null | undefined>;
  shows: ListShowsOutput["shows"];
  validate?: EditEventFormValidators;
};

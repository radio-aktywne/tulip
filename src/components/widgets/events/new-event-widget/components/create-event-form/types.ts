import {
  UseEventFormValidators,
  UseEventFormValues,
} from "../../../../../../hooks/forms/use-event-form";
import { ListShowsOutput } from "../../../../../../lib/beaver/shows/list-shows";

export type CreateEventFormData = UseEventFormValues;

export type CreateEventFormErrors = {
  [K in keyof UseEventFormValues]?: string;
};

export type CreateEventFormValidators = UseEventFormValidators;

export type CreateEventFormInput = {
  onCreate?: (
    data: CreateEventFormData,
  ) => Promise<CreateEventFormErrors | null | undefined>;
  shows: ListShowsOutput["shows"];
  validate?: CreateEventFormValidators;
};

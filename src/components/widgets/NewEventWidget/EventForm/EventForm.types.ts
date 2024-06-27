import { UseEventFormValidators } from "../../../../hooks";

export type EventFormLabels = {
  fields: {
    type: {
      title: string;
      options: {
        live: string;
        replay: string;
        prerecorded: string;
      };
    };
    show: {
      title: string;
      option: (id: string) => string;
    };
    start: {
      title: string;
    };
    end: {
      title: string;
    };
    timezone: {
      title: string;
    };
  };
  buttons: {
    create: {
      label: string;
    };
  };
};

export type EventFormValidators = UseEventFormValidators;

export type EventFormData = {
  type: string | undefined;
  show: string | undefined;
  start: Date | undefined;
  end: Date | undefined;
  timezone: string | undefined;
};

export type EventFormErrors = {
  type?: string;
  show?: string;
  start?: string;
  end?: string;
  timezone?: string;
};

export type EventFormProps = {
  labels: EventFormLabels;
  validate?: EventFormValidators;
  onCreate?: (
    data: EventFormData,
  ) => Promise<EventFormErrors | null | undefined>;
};

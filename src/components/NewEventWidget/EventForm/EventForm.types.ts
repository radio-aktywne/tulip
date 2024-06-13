import { components } from "../../../api/emishows";

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

export type EventFormValidators = {
  type?: (value: string | undefined) => string | null | undefined;
  show?: (value: string | undefined) => string | null | undefined;
  start?: (value: Date | undefined) => string | null | undefined;
  end?: (value: Date | undefined) => string | null | undefined;
  timezone?: (value: string | undefined) => string | null | undefined;
};

export type EventFormProps = {
  labels: EventFormLabels;
  shows: components["schemas"]["Show"][];
  validate?: EventFormValidators;
  onCreate?: (
    data: EventFormData,
  ) => Promise<EventFormErrors | null | undefined>;
};

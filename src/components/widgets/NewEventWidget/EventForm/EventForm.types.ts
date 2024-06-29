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
    recurrence: {
      title: string;
      recurring: {
        options: {
          no: string;
          yes: string;
        };
      };
      repeat: {
        header: string;
        frequency: {
          options: {
            daily: {
              singular: string;
              plural: string;
            };
            weekly: {
              singular: string;
              plural: string;
            };
            monthly: {
              singular: string;
              plural: string;
            };
            yearly: {
              singular: string;
              plural: string;
            };
          };
        };
      };
      ends: {
        header: string;
        ends: {
          options: {
            never: string;
            after: string;
            on: string;
          };
        };
        count: {
          text: {
            singular: string;
            plural: string;
          };
        };
      };
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
  recurring: string | undefined;
  interval: number | undefined;
  frequency: string | undefined;
  ends: string | undefined;
  count: number | undefined;
  until: Date | undefined;
};

export type EventFormErrors = {
  type?: string;
  show?: string;
  start?: string;
  end?: string;
  timezone?: string;
  recurring?: string;
  interval?: string;
  frequency?: string;
  ends?: string;
  count?: string;
  until?: string;
};

export type EventFormProps = {
  labels: EventFormLabels;
  validate?: EventFormValidators;
  onCreate?: (
    data: EventFormData,
  ) => Promise<EventFormErrors | null | undefined>;
};

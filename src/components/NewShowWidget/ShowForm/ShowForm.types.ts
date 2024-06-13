export type ShowFormLabels = {
  fields: {
    title: {
      title: string;
    };
    description: {
      title: string;
    };
  };
  buttons: {
    create: {
      label: string;
    };
  };
};

export type ShowFormData = {
  title: string | undefined;
  description: string | undefined;
};

export type ShowFormErrors = {
  title?: string;
  description?: string;
};

export type ShowFormValidators = {
  title?: (value: string | undefined) => string | null | undefined;
  description?: (value: string | undefined) => string | null | undefined;
};

export type ShowFormProps = {
  labels: ShowFormLabels;
  validate?: ShowFormValidators;
  onCreate?: (data: ShowFormData) => Promise<ShowFormErrors | null | undefined>;
};

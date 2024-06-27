import { UseShowFormValidators } from "../../../../hooks";

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

export type ShowFormValidators = UseShowFormValidators;

export type ShowFormData = {
  title: string | undefined;
  description: string | undefined;
};

export type ShowFormErrors = {
  title?: string;
  description?: string;
};

export type ShowFormProps = {
  labels: ShowFormLabels;
  validate?: ShowFormValidators;
  onCreate?: (data: ShowFormData) => Promise<ShowFormErrors | null | undefined>;
};

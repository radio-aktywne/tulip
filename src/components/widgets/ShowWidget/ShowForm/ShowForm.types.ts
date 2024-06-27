import {
  UseShowFormInitialValues,
  UseShowFormValidators,
} from "../../../../hooks";

export type ShowFormValues = UseShowFormInitialValues;

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
    save: {
      label: string;
    };
    delete: {
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
  values: ShowFormValues;
  labels: ShowFormLabels;
  validate?: ShowFormValidators;
  onSave?: (data: ShowFormData) => Promise<ShowFormErrors | null | undefined>;
  onDelete?: () => void;
};

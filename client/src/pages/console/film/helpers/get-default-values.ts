import { filmDefaultFormValues } from '../configs';
import { FormMode } from '../enums';

type Params = {
  isEdit: boolean;
  title?: string;
};

export const getDefaultValues = ({ isEdit, title }: Params) => {
  if (isEdit) {
    return {};
  }

  const defaultValues = {
    ...filmDefaultFormValues,
    mode: FormMode.CREATE,
    title: title ? title : filmDefaultFormValues.title,
  };

  return defaultValues;
};

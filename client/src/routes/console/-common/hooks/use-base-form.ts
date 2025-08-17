import {
  baseFormInitialValues,
  baseFormValidation,
  type BaseFormValues,
} from '@/routes/console/-common';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export const useBaseForm = (defaultValues?: BaseFormValues) => {
  return useForm({
    defaultValues: defaultValues ?? baseFormInitialValues,
    resolver: yupResolver(baseFormValidation),
  });
};

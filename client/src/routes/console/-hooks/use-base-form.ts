import { baseFormInitialValues } from '@/routes/console/-configs';
import { BaseFormValues } from '@/routes/console/-types';
import { baseFormValidation } from '@/routes/console/-validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export const useBaseForm = (defaultValues?: BaseFormValues) => {
  return useForm({
    defaultValues: defaultValues ?? baseFormInitialValues,
    resolver: yupResolver(baseFormValidation),
  });
};

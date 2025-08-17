import { baseFormInitialValues } from '@/routes/console/-common/configs';
import { type BaseFormValues } from '@/routes/console/-common/types';
import { baseFormValidation } from '@/routes/console/-common/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export const useBaseForm = (defaultValues?: BaseFormValues) => {
  return useForm({
    defaultValues: defaultValues ?? baseFormInitialValues,
    resolver: yupResolver(baseFormValidation),
  });
};

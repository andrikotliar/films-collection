import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PersonFormValues } from '../types';
import { createPersonSchema } from '../validation';

const defaultValues: PersonFormValues = {
  name: '',
  image: null,
};

export const usePersonForm = (initialValues?: PersonFormValues) => {
  return useForm({
    defaultValues: {
      ...defaultValues,
      ...initialValues,
    },
    resolver: yupResolver(createPersonSchema),
  });
};

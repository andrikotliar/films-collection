import { Button, FormFileInput, FormTextInput, FormTitle } from '@/ui';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styles from './CreatePersonForm.module.css';

type FormValues = {
  name: string;
  image: string | File | null;
};

export type CreatePersonFormProps = {
  title?: string;
  initialValues?: FormValues;
  onSubmit: (values: FormValues) => void;
};

const defaultValues: FormValues = {
  name: '',
  image: null,
};

export const CreatePersonForm: FC<CreatePersonFormProps> = ({
  initialValues,
  onSubmit,
  title = 'Create person',
}) => {
  const form = useForm({
    defaultValues: {
      ...defaultValues,
      ...initialValues,
    },
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
        <FormTitle>{title}</FormTitle>
        <FormTextInput name="name" label="Person name" />
        <FormFileInput name="image" label="Person photo" width={150} />
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
};

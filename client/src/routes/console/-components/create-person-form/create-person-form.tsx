import styles from './create-person-form.module.css';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { LoaderCircleIcon, SaveIcon } from 'lucide-react';
import { Button, FormFileInput, FormTextInput, FormTitle } from '@/components';
import { yupResolver } from '@hookform/resolvers/yup';
import { createPersonSchema } from './validation';

export type FormValues = {
  name: string;
  image: any;
};

export type CreatePersonFormProps = {
  title?: string;
  initialValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  isLoading?: boolean;
};

const defaultValues: FormValues = {
  name: '',
  image: null,
};

export const CreatePersonForm: FC<CreatePersonFormProps> = ({
  initialValues,
  onSubmit,
  title = 'Create person',
  isLoading = false,
}) => {
  const form = useForm({
    defaultValues: {
      ...defaultValues,
      ...initialValues,
    },
    resolver: yupResolver(createPersonSchema),
  });

  return (
    <FormProvider {...form}>
      <div className={styles.form}>
        <FormTitle>{title}</FormTitle>
        <FormTextInput name="name" label="Person name" />
        <FormFileInput name="image" label="Person photo" width={150} />
        <Button
          onClick={form.handleSubmit(onSubmit)}
          icon={
            isLoading ? <LoaderCircleIcon className="spin" /> : <SaveIcon />
          }
        >
          Submit
        </Button>
      </div>
    </FormProvider>
  );
};

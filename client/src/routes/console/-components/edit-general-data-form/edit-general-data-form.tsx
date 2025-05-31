import { useToaster } from '@/hooks';
import { BaseForm } from '@/routes/console/-components';
import { useBaseForm } from '@/routes/console/-hooks';
import { BaseFormValues } from '@/routes/console/-types';
import { GeneralData } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { FormProvider } from 'react-hook-form';

type EditGeneralDataFormProps = {
  updateHandler: (id: number, values: BaseFormValues) => Promise<unknown>;
  defaultValues: GeneralData;
  onSubmitSuccess: VoidFunction;
  title?: string;
};

export const EditGeneralDataForm: FC<EditGeneralDataFormProps> = ({
  defaultValues,
  onSubmitSuccess,
  updateHandler,
  title,
}) => {
  const toaster = useToaster();
  const form = useBaseForm({
    title: defaultValues.title,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: BaseFormValues) => {
      return updateHandler(defaultValues.id, values);
    },
    onSuccess: onSubmitSuccess,
    onError: (error) => {
      toaster.error(error?.message);
    },
  });

  return (
    <FormProvider {...form}>
      <BaseForm
        onSubmit={form.handleSubmit((values) => mutate(values))}
        isSaving={isPending}
        title={title}
      />
    </FormProvider>
  );
};

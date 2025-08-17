import type { GeneralData } from '@/common';
import { useToaster } from '@/hooks';
import { BaseForm, useBaseForm, type BaseFormValues } from '@/routes/console/-common';
import { useMutation } from '@tanstack/react-query';
import { FormProvider } from 'react-hook-form';

type GeneralDataFormProps = {
  updateHandler: (id: number, values: BaseFormValues) => Promise<unknown>;
  defaultValues: GeneralData;
  onSubmitSuccess: VoidFunction;
  title?: string;
};

export const GeneralDataForm = ({
  defaultValues,
  onSubmitSuccess,
  updateHandler,
  title,
}: GeneralDataFormProps) => {
  const { showErrorMessage } = useToaster();
  const form = useBaseForm({
    title: defaultValues.title,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: BaseFormValues) => {
      return updateHandler(defaultValues.id, values);
    },
    onSuccess: onSubmitSuccess,
    onError: (error) => {
      showErrorMessage(error?.message);
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

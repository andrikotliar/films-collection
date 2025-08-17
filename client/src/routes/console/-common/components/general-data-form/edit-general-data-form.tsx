import { useToaster } from '@/hooks';
import { BaseForm } from '@/routes/console/-components';
import { useBaseForm } from '@/routes/console/-common/hooks';
import { BaseFormValues } from '@/routes/console/-common/types';
import { GeneralData } from '@/common';
import { useMutation } from '@tanstack/react-query';
import { FormProvider } from 'react-hook-form';

type EditGeneralDataFormProps = {
  updateHandler: (id: number, values: BaseFormValues) => Promise<unknown>;
  defaultValues: GeneralData;
  onSubmitSuccess: VoidFunction;
  title?: string;
};

export const EditGeneralDataForm = ({
  defaultValues,
  onSubmitSuccess,
  updateHandler,
  title,
}: EditGeneralDataFormProps) => {
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

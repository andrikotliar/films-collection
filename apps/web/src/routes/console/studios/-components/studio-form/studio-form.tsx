import { api, Form, mutateEntity, queryKeys, type FormComponentProps } from '~/shared';
import { getFormTitle } from '~/routes/console/-shared/helpers';
import type z from 'zod';
import { StudioFormSchema } from '~/routes/console/studios/-schemas';
import { useMutation } from '@tanstack/react-query';
import { useFormModal } from '~/routes/console/-shared';

type StudioFormProps = FormComponentProps<z.infer<typeof StudioFormSchema>>;

export const StudioForm = ({ values }: StudioFormProps) => {
  const { onClose } = useFormModal();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: mutateEntity(api.studios.create, api.studios.patch),
    meta: {
      invalidateQueries: [queryKeys.studios.list(), queryKeys.initialData.list()],
    },
  });

  const submit = async (data: z.infer<typeof StudioFormSchema>) => {
    await mutateAsync(data);
    onClose();
  };

  return (
    <Form
      onSubmit={submit}
      isLoading={isPending}
      title={getFormTitle(values, 'Studio')}
      defaultValues={values}
      schema={StudioFormSchema}
    >
      <Form.TextInput name="title" label="Title" />
    </Form>
  );
};

import { api, Form, mutateEntity, queryKeys, type FormComponentProps } from '~/shared';
import { getFormTitle } from '~/routes/console/-shared/helpers';
import type z from 'zod';
import { useFormModal } from '~/routes/console/-shared';
import { CountryFormSchema } from '~/routes/console/countries/-schemas';
import { useMutation } from '@tanstack/react-query';

type CountryFormProps = FormComponentProps<z.infer<typeof CountryFormSchema>>;

export const CountryForm = ({ values }: CountryFormProps) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: mutateEntity(api.countries.create, api.countries.patch),
    meta: {
      invalidateQueries: [queryKeys.countries.list(), queryKeys.initialData.list()],
    },
  });
  const { onClose } = useFormModal();

  const submit = async (data: z.infer<typeof CountryFormSchema>) => {
    await mutateAsync(data);
    onClose();
  };

  return (
    <Form
      onSubmit={submit}
      defaultValues={values}
      schema={CountryFormSchema}
      isLoading={isPending}
      title={getFormTitle(values, 'Country')}
    >
      <Form.TextInput name="title" label="Title" />
    </Form>
  );
};

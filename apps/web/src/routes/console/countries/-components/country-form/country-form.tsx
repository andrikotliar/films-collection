import { api, Form, mutateEntity, type FormComponentProps } from '~/shared';
import { getFormTitle } from '~/routes/console/-shared/helpers';
import type z from 'zod';
import { useFormModal } from '~/routes/console/-shared';
import { CountryFormSchema } from '~/routes/console/countries/-schemas';
import { useMutation } from '@tanstack/react-query';

type CountryFormProps = FormComponentProps<z.infer<typeof CountryFormSchema>>;

export const CountryForm = ({ values }: CountryFormProps) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: mutateEntity(api.countries.create.exec, api.countries.update.exec),
    meta: {
      invalidateQueries: [
        { queryKey: api.countries.getList.staticKey },
        { queryKey: api.initialData.get.staticKey },
      ],
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

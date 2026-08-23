import { useMutation } from '@tanstack/react-query';
import type z from 'zod';
import { getFormTitle, useFormModal } from '~/routes/console/-shared';
import { HobbyFormSchema } from '~/routes/console/hobbies/-schemas';
import { api, Form, mutateEntity, queryKey, type FormComponentProps } from '~/shared';

type HobbyFormProps = FormComponentProps<z.infer<typeof HobbyFormSchema>>;

export const HobbyForm = ({ values }: HobbyFormProps) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: mutateEntity(api.hobbies.createHobby, api.hobbies.updateHobby),
    meta: {
      invalidateQueries: [{ queryKey: queryKey('hobbies.getHobbiesList') }],
    },
  });
  const { onClose } = useFormModal();

  const submit = async (data: z.infer<typeof HobbyFormSchema>) => {
    await mutateAsync(data);
    onClose();
  };

  return (
    <Form
      onSubmit={submit}
      defaultValues={values}
      schema={HobbyFormSchema}
      isLoading={isPending}
      title={getFormTitle(values, 'Hobby')}
    >
      <Form.TextInput name="title" label="Title" />
    </Form>
  );
};

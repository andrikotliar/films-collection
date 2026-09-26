import { useMutation } from '@tanstack/react-query';
import type z from 'zod';
import { getFormTitle, useFormModal } from '~/routes/console/-shared';
import { HobbyFormSchema } from '~/routes/console/hobbies/-schemas';
import { api, Form, mutateEntity, queryKey, uploadImage, type FormComponentProps } from '~/shared';

type HobbyFormProps = FormComponentProps<z.infer<typeof HobbyFormSchema>>;

export const HobbyForm = ({ values }: HobbyFormProps) => {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: mutateEntity(api.hobbies.createHobby, api.hobbies.updateHobby),
    meta: {
      invalidateQueries: { queryKey: queryKey('hobbies.getHobbiesList') },
    },
  });
  const { onClose } = useFormModal();

  const submit = async (data: z.infer<typeof HobbyFormSchema>) => {
    const { title, imagePath, id } = data;

    const url = await uploadImage({ image: imagePath, title, folder: 'hobbies' });

    await mutateAsync({ title, imagePath: url, id });
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
      <Form.FileInput name="imagePath" label="Image" width="80%" height={300} />
    </Form>
  );
};

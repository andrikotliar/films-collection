import { CreateChapterKeyInputSchema } from '@films-collection/shared';
import { useMutation } from '@tanstack/react-query';
import type z from 'zod';
import { useFormModal } from '~/routes/console/-shared';
import { api, Form, queryKeys, type FormComponentProps } from '~/shared';

type ChapterFormProps = FormComponentProps<z.infer<typeof CreateChapterKeyInputSchema>>;

export const ChapterForm = ({ values }: ChapterFormProps) => {
  const { onClose } = useFormModal();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: z.infer<typeof CreateChapterKeyInputSchema>) => {
      return api.chapterKeys.create({ input: data });
    },
    meta: {
      invalidateQueries: [queryKeys.chapterKeys.options.list()],
    },
    onSuccess: () => {
      onClose();
    },
  });

  return (
    <Form
      onSubmit={mutateAsync}
      schema={CreateChapterKeyInputSchema}
      title="Create chapter key"
      defaultValues={values}
      isLoading={isPending}
    >
      <Form.TextInput name="key" label="Key" />
    </Form>
  );
};

import styles from './pending-film-form.module.css';
import {
  api,
  FieldLabel,
  Form,
  getInitialDataQueryOptions,
  mutateEntity,
  priorityOptions,
  queryKeys,
  type FormComponentProps,
  type StatusColor,
} from '~/shared';
import { getFormTitle, useFormModal } from '~/routes/console/-shared';
import type z from 'zod';
import { PendingFilmFormSchema } from '~/routes/console/pending-films/-schemas';
import { useMutation, useQuery } from '@tanstack/react-query';

type PendingFilmFormProps = FormComponentProps<z.infer<typeof PendingFilmFormSchema>>;

export const PendingFilmForm = ({ values }: PendingFilmFormProps) => {
  const { data } = useQuery(getInitialDataQueryOptions());
  const { onClose } = useFormModal();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: mutateEntity(api.pendingFilms.create, api.pendingFilms.patch),
    meta: {
      invalidateQueries: [queryKeys.pendingFilms.list()],
    },
  });

  const submit = async (values: z.infer<typeof PendingFilmFormSchema>) => {
    await mutateAsync(values);
    onClose();
  };

  return (
    <Form
      onSubmit={submit}
      defaultValues={values}
      schema={PendingFilmFormSchema}
      title={getFormTitle(values, 'Pending Film')}
      isLoading={isPending}
    >
      <Form.TextInput name="title" label="Title" />
      <div>
        <FieldLabel>Priority</FieldLabel>
        <div className={styles.priorities}>
          {priorityOptions.map((option) => (
            <Form.Checkbox
              key={option.value}
              label={option.label}
              value={option.value}
              name="priority"
              type="checkbox"
              theme={option.color as StatusColor}
            />
          ))}
        </div>
      </div>
      <Form.Select
        name="collectionId"
        options={data?.options.collections ?? []}
        label="Collection"
      />
      <Form.RatingInput name="rating" size={3} label="Rating" />
    </Form>
  );
};

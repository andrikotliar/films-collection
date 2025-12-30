import styles from './pending-film-form.module.css';
import {
  FieldLabel,
  Form,
  priorityOptions,
  useInitialData,
  useMutatePendingFilm,
  type FormComponentProps,
  type StatusColor,
} from '~/shared';

import { getFormTitle } from '~/routes/console/-shared';
import type z from 'zod';
import { PendingFilmFormSchema } from '~/routes/console/pending-films/-schemas';

type PendingFilmFormProps = FormComponentProps<z.infer<typeof PendingFilmFormSchema>>;

export const PendingFilmForm = ({ values, afterSubmitEffect }: PendingFilmFormProps) => {
  const { data } = useInitialData();

  const { mutateAsync, isPending } = useMutatePendingFilm();

  const submit = async (values: z.infer<typeof PendingFilmFormSchema>) => {
    await mutateAsync(values);
    afterSubmitEffect();
  };

  const title = getFormTitle(values, 'Pending Film');

  return (
    <Form
      onSubmit={submit}
      defaultValues={values}
      schema={PendingFilmFormSchema}
      title={title}
      isLoading={isPending}
    >
      <Form.TextInput name="title" label="Title" />
      <div>
        <FieldLabel>Priority</FieldLabel>
        <div className={styles.priorities}>
          {priorityOptions.map((option) => (
            <Form.StatusFilterButton
              name="priority"
              title={option.label}
              value={String(option.value)}
              key={option.value}
              color={option.color as StatusColor}
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

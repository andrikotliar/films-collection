import styles from './styles.module.css';
import {
  FieldLabel,
  Form,
  fetchInitialDataQuery,
  priorityOptions,
  useMutatePendingFilm,
  type FormComponentProps,
  type StatusColor,
  type PendingFilmMutationPayload,
} from '~/shared';
import { useQuery } from '@tanstack/react-query';
import { pendingFilmSchema } from '~/routes/console/pending-films/-validation';
import { getFormTitle } from '~/routes/console/-shared';

type PendingFilmFormProps = FormComponentProps<PendingFilmMutationPayload>;

export const PendingFilmForm = ({ values, afterSubmitEffect }: PendingFilmFormProps) => {
  const { data } = useQuery(fetchInitialDataQuery());

  const { mutateAsync, isPending } = useMutatePendingFilm();

  const submit = async (values: PendingFilmMutationPayload) => {
    await mutateAsync(values);
    afterSubmitEffect();
  };

  const title = getFormTitle(values, 'Pending Film');

  return (
    <Form
      onSubmit={submit}
      defaultValues={values}
      schema={pendingFilmSchema}
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

import {
  FormTextInput,
  FormStatusFilterButton,
  FieldLabel,
  FormTitle,
  FormSelect,
  FormRatingInput,
  Form,
} from '@/components';
import { useQuery } from '@tanstack/react-query';
import {
  fetchInitialDataQuery,
  priorityOptions,
  type FormComponentProps,
  type StatusColor,
} from '@/common';
import { useMutatePendingFilm, type PendingFilmMutationPayload } from '@/hooks';
import { pendingFilmSchema } from '@/routes/console/pending/-validation';
import { getFormTitle } from '@/routes/console/-common/helpers';

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
      <FormTitle>{title}</FormTitle>
      <FormTextInput name="title" label="Title" />
      <div>
        <FieldLabel>Priority</FieldLabel>
        <div className="flex flex-wrap gap-2.5 mt-2">
          {priorityOptions.map((option) => (
            <FormStatusFilterButton
              name="priority"
              title={option.label}
              value={String(option.value)}
              key={option.value}
              color={option.color as StatusColor}
            />
          ))}
        </div>
      </div>
      <FormSelect
        name="collectionId"
        options={data?.options.collections ?? []}
        label="Collection"
      />
      <FormRatingInput name="rating" size={3} label="Rating" />
    </Form>
  );
};

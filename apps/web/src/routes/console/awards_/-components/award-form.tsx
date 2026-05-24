import { api, Form, FormIdParamSchema, mutateEntity, Panel, queryKey, type Input } from '~/shared';
import { NominationsForm } from '~/routes/console/awards_/-components/nominations-form/nominations-form';
import { CreateAwardInputSchema } from '@films-collection/shared';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

type AwardFormProps = {
  values: Input<typeof api.awards.create>;
};

const AwardFormSchema = CreateAwardInputSchema.extend({
  id: FormIdParamSchema,
});

export const AwardForm = ({ values }: AwardFormProps) => {
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: mutateEntity(api.awards.create, api.awards.update),
    onSuccess: () => {
      navigate({
        to: '/console/awards',
      });
    },
    meta: {
      invalidateQueries: [
        {
          queryKey: queryKey('awards.getById'),
        },
        {
          queryKey: queryKey('awards.getList'),
        },
        {
          queryKey: queryKey('initialData.get'),
        },
      ],
    },
  });

  return (
    <Form
      onSubmit={mutateAsync}
      defaultValues={values}
      schema={AwardFormSchema}
      isLoading={isPending}
      islandActions
    >
      <Panel isFlexContainer>
        <Form.TextInput name="title" label="Title" />
        <Form.TextArea name="description" label="Description" />
        <NominationsForm />
      </Panel>
    </Form>
  );
};

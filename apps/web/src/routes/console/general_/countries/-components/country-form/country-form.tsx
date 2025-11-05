import {
  Form,
  useMutateCountry,
  type CountryMutationPayload,
  type FormComponentProps,
} from '~/common';
import { getFormTitle } from '~/routes/console/-shared/helpers';
import { countryFormValidation } from '~/routes/console/general_/countries/-validation';

type CountryFormProps = FormComponentProps<CountryMutationPayload>;

export const CountryForm = ({ values, afterSubmitEffect }: CountryFormProps) => {
  const { mutateAsync, isPending } = useMutateCountry();

  const submit = async (data: CountryMutationPayload) => {
    await mutateAsync(data);
    afterSubmitEffect();
  };

  const title = getFormTitle(values, 'Country');

  return (
    <Form
      onSubmit={submit}
      defaultValues={values}
      schema={countryFormValidation}
      isLoading={isPending}
      title={title}
    >
      <Form.TextInput name="title" label="Title" />
    </Form>
  );
};

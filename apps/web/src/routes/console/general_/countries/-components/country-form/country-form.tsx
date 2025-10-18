import type { FormComponentProps } from '~/common';
import { Form, FormTextInput } from '~/components';
import { type CountryMutationPayload, useMutateCountry } from '~/hooks/queries';
import { getFormTitle } from '~/routes/console/-common/helpers';
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
      <FormTextInput name="title" label="Title" />
    </Form>
  );
};

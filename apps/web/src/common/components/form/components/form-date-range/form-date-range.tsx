import { useFormContext } from 'react-hook-form';
import { FormDatePicker } from '~/common/components/form/components/form-date-picker/form-date-picker';
import { FormGroup } from '~/common/components/form/components/form-group/form-group';
import { MIN_DATE } from '~/common/constants';
import type { DateFilter } from '~/common/types';

type FormDateRangeProps = {
  inputs: DateFilter['inputs'];
  title: string;
};

export const FormDateRange = ({ inputs, title }: FormDateRangeProps) => {
  const { getValues } = useFormContext();
  const formValues = getValues();

  return (
    <FormGroup title={title}>
      <FormDatePicker
        name={inputs.start.id}
        min={MIN_DATE}
        max={formValues[inputs.end.id] ?? undefined}
        label={inputs.start.label}
      />
      <FormDatePicker
        name={inputs.end.id}
        min={formValues[inputs.start.id] ?? MIN_DATE}
        label={inputs.end.label}
      />
    </FormGroup>
  );
};

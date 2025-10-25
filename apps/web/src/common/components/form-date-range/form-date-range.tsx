import { type DateFilter, MIN_DATE } from '~/common';
import { FormGroup } from '../form-group/form-group';
import { FormDatePicker } from '../date-picker';
import { useFormContext } from 'react-hook-form';

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

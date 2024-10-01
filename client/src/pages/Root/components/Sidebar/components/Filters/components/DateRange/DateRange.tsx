import { DateFilter } from '@/types/filter';
import { FC } from 'react';
import { Group } from '../Group';
import { FormDatePicker } from '@/components/FormDatePicker';
import { useFormContext } from 'react-hook-form';
import { MIN_DATE } from '@/constants';

type DateRangeProps = {
  inputs: DateFilter['inputs'];
  title: string;
};

const DateRange: FC<DateRangeProps> = ({ inputs, title }) => {
  const { getValues } = useFormContext();
  const formValues = getValues();

  return (
    <Group title={title}>
      <FormDatePicker
        name={inputs.start.property}
        min={MIN_DATE}
        max={formValues[inputs.end.property] ?? undefined}
        label={inputs.start.label}
      />
      <FormDatePicker
        name={inputs.end.property}
        min={formValues[inputs.start.property] ?? MIN_DATE}
        label={inputs.end.label}
      />
    </Group>
  );
};

export { DateRange };

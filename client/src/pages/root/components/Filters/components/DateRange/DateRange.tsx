import { DateFilter } from '@/types/filter';
import { FC } from 'react';
import { Group } from '../Group/Group';
import { FormDatePicker } from '@/ui';
import { useFormContext } from 'react-hook-form';
import { MIN_DATE } from '@/constants';

type DateRangeProps = {
  inputs: DateFilter['inputs'];
  title: string;
};

export const DateRange: FC<DateRangeProps> = ({ inputs, title }) => {
  const { getValues } = useFormContext();
  const formValues = getValues();

  return (
    <Group title={title}>
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
    </Group>
  );
};

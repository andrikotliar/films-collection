import { FC } from 'react';
import { FilterItem } from '@/types';
import { FormCheckbox } from '@/components';
import { Group } from '../Group/Group';
import { DateRange } from '../DateRange/DateRange';

type FilterOptionsProps = {
  filter: FilterItem;
};

export const FilterOptions: FC<FilterOptionsProps> = ({ filter }) => {
  switch (filter.type) {
    case 'checkmark':
      return (
        <Group title={filter.title}>
          {filter.options.map((option, index) => (
            <FormCheckbox
              type={filter.inputType}
              label={option.title}
              value={option.filter}
              name={filter.property}
              key={index}
            />
          ))}
        </Group>
      );

    case 'daterange':
      return <DateRange title={filter.title} inputs={filter.inputs} />;

    default:
      return null;
  }
};

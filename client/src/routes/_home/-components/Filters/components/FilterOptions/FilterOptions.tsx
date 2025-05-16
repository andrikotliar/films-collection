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
          {filter.options.map((option) => (
            <FormCheckbox
              type={filter.inputType}
              label={option.label}
              value={option.value}
              name={filter.id}
              key={option.value}
            />
          ))}
        </Group>
      );

    case 'daterange':
      return <DateRange title={filter.title} inputs={filter.inputs} />;

    case 'nested':
      return (
        <Group title={filter.title}>
          {filter.options.map((option) => (
            <FormCheckbox
              type="checkbox"
              label={option.label}
              name={option.id}
              key={option.id}
              rightIcon={option.icon}
            />
          ))}
        </Group>
      );

    default:
      return null;
  }
};

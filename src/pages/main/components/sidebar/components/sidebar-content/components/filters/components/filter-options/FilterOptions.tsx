import { FC } from 'react';
import { FilterItem } from '@/common/types';
import { FormCheckbox } from '@/components';
import { Group } from '../group/Group';
import { DateRange } from '../date-range/DateRange';

type FilterOptionsProps = {
  filter: FilterItem;
};

const FilterOptions: FC<FilterOptionsProps> = ({ filter }) => {
  switch (filter.type) {
    case 'checkmark':
      return (
        <Group title={filter.title}>
          {filter.options.map((option, index) => (
            <FormCheckbox
              type={filter.inputType}
              value={option}
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

export { FilterOptions };

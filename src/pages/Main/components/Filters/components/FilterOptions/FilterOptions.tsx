import classes from './FilterOptions.module.css';
import { FC } from 'react';
import { Filter, PropsWithClassName } from '@/common';
import { FormCheckbox } from '@/components';
import { Group } from '@/pages/Main/components/Filters/components/Group';
import classNames from 'classnames';

type FilterOptionsProps = {
  filter: Filter;
};

const FilterOptions: FC<
  PropsWithClassName<FilterOptionsProps>
> = ({ filter, className }) => {
  return (
    <Group
      title={filter.title}
      bodyClassName={classNames(
        classes.filterOptions,
        {
          [classes.scrollable]: filter.isScrollable,
        },
        className,
      )}
    >
      {filter.options.map((option, index) => (
        <FormCheckbox
          type={filter.isRadio ? 'radio' : 'checkbox'}
          value={option}
          name={filter.property}
          key={index}
        />
      ))}
    </Group>
  );
};

export { FilterOptions };

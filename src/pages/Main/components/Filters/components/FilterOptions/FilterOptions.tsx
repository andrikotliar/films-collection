import styles from './FilterOptions.module.css';
import { FC } from 'react';
import { FilterItem, PropsWithClassName } from '@/common';
import { FormCheckbox } from '@/components';
import { Group } from '@/pages/Main/components/Filters/components/Group';
import classNames from 'classnames';

type FilterOptionsProps = {
  filter: FilterItem;
};

const FilterOptions: FC<PropsWithClassName<FilterOptionsProps>> = ({
  filter,
  className,
}) => {
  return (
    <Group
      title={filter.title}
      bodyClassName={classNames(
        styles.filterOptions,
        {
          [styles.scrollable]: filter.isScrollable,
          [styles.grid]: filter.isGrid,
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

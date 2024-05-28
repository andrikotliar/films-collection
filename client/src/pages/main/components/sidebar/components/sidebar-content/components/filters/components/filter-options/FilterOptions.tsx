import { FC } from 'react';
import classNames from 'classnames';
import { FilterItem, PropsWithClassName } from '@/common/types';
import { FormCheckbox } from '@/components';
import { Group } from '../group/Group';

import styles from './FilterOptions.module.css';

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

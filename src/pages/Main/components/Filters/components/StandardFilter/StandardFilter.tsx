import classes from './StandardFilter.module.css';
import { FC } from 'react';
import { Filter } from '@/common';
import { FormCheckbox } from '@/components';
import { GroupHeader } from '@/pages/Main/components/Filters/components/GroupHeader';
import { Group } from '@/pages/Main/components/Filters/components/Group';

type StandardFilterProps = {
  filter: Filter;
};

const StandardFilter: FC<StandardFilterProps> = ({
  filter,
}) => {
  return (
    <Group>
      <GroupHeader>{filter.title}</GroupHeader>
      <div className={classes.standardFilter}>
        {filter.options.map((option, index) => (
          <FormCheckbox
            type={filter.radio ? 'radio' : 'checkbox'}
            value={option}
            name={filter.property}
            key={index}
          />
        ))}
      </div>
    </Group>
  );
};

export { StandardFilter };

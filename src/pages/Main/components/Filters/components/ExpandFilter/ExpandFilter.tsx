import classes from './ExpandFilter.module.css';
import { FC, useEffect } from 'react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormCheckbox } from '@/components';
import { GroupHeader } from '@/pages/Main/components/Filters/components/GroupHeader';
import { ExpandIcon } from '@/assets/icons';
import { Filter } from '@/types';
import { Group } from '@/pages/Main/components/Filters/components/Group';
import classNames from 'classnames';

type ExpandFilterProps = {
  filter: Filter;
};

const ExpandFilter: FC<ExpandFilterProps> = ({
  filter,
}) => {
  const [title, setTitle] = useState(
    filter.defaultOptionTitle,
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const { watch } = useFormContext();

  const currentValue = watch(filter.property);

  useEffect(() => {
    if (currentValue) {
      setTitle(currentValue);
    } else {
      setTitle(filter.defaultOptionTitle);
    }
  }, [currentValue]);

  return (
    <Group>
      <GroupHeader>{filter.title}</GroupHeader>
      <div className={classes.expandFilter}>
        <div className={classes.header}>
          <button
            className={classes.button}
            onClick={() => setIsExpanded(!isExpanded)}
            type="button"
          >
            <span>{title}</span>
            <ExpandIcon
              color="#000"
              className={classNames(classes.icon, {
                [classes.expanded]: isExpanded,
              })}
            />
          </button>
        </div>
        {isExpanded && (
          <div
            className={classNames(
              classes.list,
              'custom-scroll',
            )}
          >
            {filter.options.map(option => (
              <FormCheckbox
                type="radio"
                value={option}
                name={filter.property}
                key={option}
              />
            ))}
          </div>
        )}
      </div>
    </Group>
  );
};

export { ExpandFilter };

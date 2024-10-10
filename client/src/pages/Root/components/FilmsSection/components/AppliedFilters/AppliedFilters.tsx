import { useQueryFilter } from '@/hooks';
import { XIcon } from 'lucide-react';
import { FC, useMemo } from 'react';
import styles from './AppliedFilters.module.css';
import { AppliedFilter } from './types';
import { getBadgeLabel } from './helpers';

const EXCLUDE_FILTERS = [
  'skip',
  'limit',
  'actorId',
  'personRole',
  'personName',
  'collection',
  'awards',
];

const AppliedFilters: FC = () => {
  const { filterParams, deleteParam } = useQueryFilter();

  const config = useMemo(() => {
    return Object.entries(filterParams).reduce<AppliedFilter[]>(
      (result, [key, value]) => {
        if (EXCLUDE_FILTERS.includes(key)) {
          return result;
        }

        if (Array.isArray(value)) {
          const params = value.map((item) => ({
            key,
            value: item,
          }));

          return [...result, ...params];
        }

        const nextValue = { key, value };

        return [...result, nextValue];
      },
      [],
    );
  }, [filterParams]);

  const handleClearFilter = (configItem: AppliedFilter) => {
    deleteParam(configItem.key, configItem.value);
  };

  if (!config.length) {
    return null;
  }

  return (
    <div className={styles.appliedFilters}>
      {config.map((filter) => (
        <button
          onClick={() => handleClearFilter(filter)}
          className={styles.filter}
          key={filter.value}
        >
          <span>{getBadgeLabel(filter)}</span>
          <XIcon size={15} className={styles.clearIcon} />
        </button>
      ))}
    </div>
  );
};

export { AppliedFilters };

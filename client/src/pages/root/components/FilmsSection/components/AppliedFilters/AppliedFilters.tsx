import styles from './AppliedFilters.module.css';
import { getRouteApi } from '@tanstack/react-router';
import { XIcon } from 'lucide-react';
import { FC, useMemo } from 'react';
import { AppliedFilter } from './types';
import { getBadgeLabel } from './helpers';
import { FilmsListFilters } from '@/types';

const EXCLUDE_FILTERS = [
  'skip',
  'limit',
  'actorId',
  'personRole',
  'personName',
  'collection',
  'awards',
];

const routeApi = getRouteApi('/');

const AppliedFilters: FC = () => {
  const navigate = routeApi.useNavigate();
  const routeSearch = routeApi.useSearch();

  const config = useMemo(() => {
    return Object.entries(routeSearch).reduce<AppliedFilter[]>(
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
  }, [routeSearch]);

  const handleClearFilter = (configItem: AppliedFilter) => {
    const routeSearchCopy = { ...routeSearch };

    const currentKey = configItem.key as keyof FilmsListFilters;

    if (
      Array.isArray(routeSearchCopy[currentKey]) &&
      routeSearchCopy[currentKey].length > 1
    ) {
      (routeSearchCopy[currentKey] as string[]) = routeSearchCopy[
        currentKey
      ].filter((value) => value !== configItem.value);
    } else {
      delete routeSearchCopy[currentKey];
    }

    navigate({
      search: routeSearchCopy,
    });
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

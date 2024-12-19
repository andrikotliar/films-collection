import { SortingParams, SortingPopup } from '@/components';
import styles from './Tools.module.css';
import { debounce } from '@/helpers';
import { getRouteApi } from '@tanstack/react-router';
import { ChangeEvent, useCallback } from 'react';

const routeApi = getRouteApi('/console/pending');

const sortingFields = [
  { label: 'Created At', value: 'createdAt' },
  { label: 'Priority', value: 'priority' },
  { label: 'Title', value: 'title' },
];

export const Tools = () => {
  const navigate = routeApi.useNavigate();
  const searchParams = routeApi.useSearch();

  const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value.length) {
      navigate({
        search: (params) => {
          return {
            ...params,
            q: value,
          };
        },
      });
      return;
    }

    navigate({
      search: (params) => {
        return {
          ...params,
          q: undefined,
        };
      },
    });
  }, []);

  const debouncedSearch = debounce(handleSearch, 1000);

  const handleApplySorting = (sortingParams: SortingParams) => {
    navigate({
      search: (params) => {
        return {
          ...params,
          sortingField: sortingParams.sortingField,
          sortingDirection: sortingParams.sortingDirection,
        };
      },
    });
  };

  return (
    <div>
      <div className={styles.toolsRow}>
        <input
          type="text"
          onChange={debouncedSearch}
          defaultValue={searchParams.q}
          className={styles.search}
          placeholder="Search a film"
        />
        <SortingPopup fields={sortingFields} onSorting={handleApplySorting} />
      </div>
    </div>
  );
};

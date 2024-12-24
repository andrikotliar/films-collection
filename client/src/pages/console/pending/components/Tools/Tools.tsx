import { SortingParams, SortingPopup, StatusFilterButton } from '@/components';
import styles from './Tools.module.css';
import { debounce } from '@/helpers';
import { getRouteApi } from '@tanstack/react-router';
import { ChangeEvent, useCallback } from 'react';
import { priorityOptions } from '@/configs';
import { StatusColor } from '@/types';
import { FormItemLabel } from '@/components/FormItemLabel/FormItemLabel';
import { setPriorities } from './helpers';

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

  const handleApplyPriorityFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);

    navigate({
      search: (params) => {
        return {
          ...params,
          priorities: setPriorities(value, params.priorities),
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
        <div className={styles.sortingWrapper}>
          <SortingPopup
            fields={sortingFields}
            onSorting={handleApplySorting}
            buttonSize="large"
          />
        </div>
      </div>
      <div className={styles.prioritiesFilter}>
        <FormItemLabel>Filter by priority</FormItemLabel>
        <div className={styles.priorities}>
          {priorityOptions.map((option) => (
            <StatusFilterButton
              key={option.value}
              title={option.label}
              value={String(option.value)}
              color={option.color as StatusColor}
              onChange={handleApplyPriorityFilter}
              defaultChecked={searchParams.priorities?.includes(option.value)}
              name="priorities"
              isMultiple
            />
          ))}
        </div>
      </div>
    </div>
  );
};

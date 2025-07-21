import {
  SortingParams,
  SortingPopup,
  FieldLabel,
  TextInput,
  Checkbox,
} from '@/components';
import styles from './filters.module.css';
import { getRouteApi } from '@tanstack/react-router';
import { ChangeEvent, useCallback } from 'react';
import { priorityOptions, SortingOrder, debounce } from '@/common';
import { setPriorities } from './helpers';

const routeApi = getRouteApi('/console/pending');

const sortingFields = [
  { label: 'Created At', value: 'createdAt' },
  { label: 'Priority', value: 'priority' },
  { label: 'Title', value: 'title' },
];

export const Filters = () => {
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
          orderKey: sortingParams.orderKey,
          order: sortingParams.order,
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
    <div className={styles.filters}>
      <div className={styles.filtersRow}>
        <TextInput
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
            defaultOrder={searchParams.order as SortingOrder}
            defaultOrderKey={searchParams.orderKey}
            buttonSize="large"
          />
        </div>
      </div>
      <div className={styles.prioritiesFilter}>
        <FieldLabel>Filter by Priority:</FieldLabel>
        <div className={styles.priorities}>
          {priorityOptions.map((option) => (
            <Checkbox
              key={option.label}
              type="checkbox"
              label={option.label}
              value={String(option.value)}
              onChange={handleApplyPriorityFilter}
              defaultChecked={searchParams.priorities?.includes(option.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

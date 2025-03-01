import {
  SortingParams,
  SortingPopup,
  StatusFilterButton,
  FieldLabel,
  TextInput,
} from '@/ui';
import styles from './Tools.module.css';
import { debounce } from '@/helpers';
import { getRouteApi } from '@tanstack/react-router';
import { ChangeEvent, useCallback } from 'react';
import { priorityOptions } from '@/configs';
import { SortingOrder, StatusColor } from '@/types';
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
    <div>
      <div className={styles.toolsRow}>
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
        <FieldLabel>Filter by priority</FieldLabel>
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

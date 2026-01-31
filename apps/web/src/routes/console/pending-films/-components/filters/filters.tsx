import {
  type SortingParams,
  SortingPopup,
  FieldLabel,
  TextInput,
  Checkbox,
  priorityOptions,
  debounce,
} from '~/shared';
import styles from './filters.module.css';
import { getRouteApi } from '@tanstack/react-router';
import { type ChangeEvent, useCallback } from 'react';
import { setPriorities } from '~/routes/console/pending-films/-components/filters/helpers';
import { SearchIcon } from 'lucide-react';

const routeApi = getRouteApi('/console/pending-films');

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
    <>
      <div className={styles.filters_row}>
        <TextInput
          type="text"
          onChange={debouncedSearch}
          defaultValue={searchParams.q}
          className={styles.search}
          placeholder="Search pending film"
          icon={<SearchIcon />}
        />
        <SortingPopup
          fields={sortingFields}
          onSorting={handleApplySorting}
          defaultOrder={searchParams.order}
          defaultOrderKey={searchParams.orderKey}
          buttonSize="large"
        />
      </div>
      <div className={styles.priorities_filter}>
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
    </>
  );
};

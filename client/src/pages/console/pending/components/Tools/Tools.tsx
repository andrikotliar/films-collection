import {
  SortingParams,
  SortingPopup,
  StatusFilterButton,
  FieldLabel,
  TextInput,
  Island,
} from '@/components';
import styles from './Tools.module.css';
import { getRouteApi } from '@tanstack/react-router';
import { ChangeEvent } from 'react';
import { priorityOptions } from '@/configs';
import { SortingDirection, StatusColor } from '@/types';
import { setPriorities } from './helpers';
import { useDebouncedSearch } from '@/hooks';

const routeApi = getRouteApi('/console/pending');

const sortingFields = [
  { label: 'Created At', value: 'createdAt' },
  { label: 'Priority', value: 'priority' },
  { label: 'Title', value: 'title' },
];

export const Tools = () => {
  const navigate = routeApi.useNavigate();
  const searchParams = routeApi.useSearch();

  const handleSearch = useDebouncedSearch((value) => {
    navigate({
      search: (params) => {
        return {
          ...params,
          q: value,
        };
      },
    });
  });

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
        <TextInput
          type="text"
          onChange={handleSearch}
          defaultValue={searchParams.q}
          className={styles.search}
          placeholder="Search a film"
        />
        <div className={styles.sortingWrapper}>
          <SortingPopup
            fields={sortingFields}
            onSorting={handleApplySorting}
            defaultSortingDirection={
              searchParams.sortingDirection as SortingDirection
            }
            defaultSortingField={searchParams.sortingField}
            buttonSize="large"
          />
        </div>
      </div>
      <Island flexContainer>
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
      </Island>
    </div>
  );
};

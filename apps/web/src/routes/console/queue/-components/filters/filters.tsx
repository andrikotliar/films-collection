import { useSuspenseQuery } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import {
  Button,
  countObjectKeys,
  getInitialDataQueryOptions,
  Select,
  type api,
  type QueryParams,
} from '~/shared';
import styles from './filters.module.css';
import { XIcon } from 'lucide-react';
import { extendedFilmStatusOptions } from '@films-collection/shared';

const defaultFilters: Partial<QueryParams<typeof api.films.getAdminIncompleteFilmsList.exec>> = {
  collectionId: undefined,
  type: undefined,
  style: undefined,
};

const routeApi = getRouteApi('/console/queue');
const statusFilterOptions = extendedFilmStatusOptions.filter((option) => option.value !== 'ADDED');

export const Filters = () => {
  const navigate = routeApi.useNavigate();
  const search = routeApi.useSearch();
  const { data } = useSuspenseQuery(getInitialDataQueryOptions());

  const filtersCount = countObjectKeys(search, ['pageIndex', 'q', 'status']);

  const handleSelect = (
    key: keyof QueryParams<typeof api.films.getAdminIncompleteFilmsList.exec>,
    value: string | number | null,
  ) => {
    navigate({
      search: (prev) => ({
        ...prev,
        [key]: value ? value : undefined,
      }),
    });
  };

  const resetFilters = () => {
    navigate({
      search: (prev) => ({
        ...prev,
        ...defaultFilters,
      }),
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.filters}>
        <Select
          label="Status"
          options={statusFilterOptions}
          onSelect={(value) => handleSelect('status', value)}
          value={search.status}
          isClearable={false}
          isSearchable={false}
        />
        <Select
          label="Type"
          options={data.options.types}
          onSelect={(value) => handleSelect('type', value)}
          value={search.type}
          isSearchable={false}
        />
        <Select
          label="Style"
          options={data.options.styles}
          onSelect={(value) => handleSelect('style', value)}
          value={search.style}
          isSearchable={false}
        />
      </div>
      {filtersCount > 0 && (
        <Button onClick={resetFilters} variant="ghost" icon={<XIcon />}>
          Clear filters
        </Button>
      )}
    </div>
  );
};

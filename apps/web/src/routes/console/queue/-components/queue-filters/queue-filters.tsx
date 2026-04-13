import type { ListOption } from '@films-collection/shared';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useMemo } from 'react';
import type { FileRouteTypes } from '~/routeTree.gen';
import {
  Button,
  Checkbox,
  countObjectKeys,
  getInitialDataQueryOptions,
  Select,
  type api,
  type ApiResponse,
  type QueryParams,
} from '~/shared';
import styles from './queue-filters.module.css';
import { XIcon } from 'lucide-react';

const findCollectionFilter = (
  initialData: ApiResponse<typeof api.initialData.get.exec>,
): ListOption | undefined => {
  const miniSeriesCollection = initialData.options.collections.find(
    (collection) => collection.label === 'Mini Series',
  );
  return miniSeriesCollection;
};

const defaultFilters: Partial<QueryParams<typeof api.films.getAdminIncompleteFilmsList.exec>> = {
  collectionId: undefined,
  type: undefined,
  style: undefined,
};

type QueueFiltersProps = {
  pageRoute: Extract<
    FileRouteTypes['fullPaths'],
    '/console/queue/' | '/console/queue/planned' | '/console/queue/upcoming'
  >;
};

export const QueueFilters = ({ pageRoute }: QueueFiltersProps) => {
  const navigate = useNavigate({ from: pageRoute });
  const search = useSearch({ from: pageRoute });
  const { data } = useSuspenseQuery(getInitialDataQueryOptions());

  const filtersCount = countObjectKeys(search, ['pageIndex', 'q', 'status']);

  const collectionFilter = useMemo(() => {
    if (!search.type || search.type !== 'SERIES') {
      return undefined;
    }
    return findCollectionFilter(data);
  }, [data, search]);

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

  const handleCollectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const value = event.target.value;

    handleSelect('collectionId', isChecked ? Number(value) : null);
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
          label="Type"
          options={data.options.types}
          onSelect={(value) => handleSelect('type', value)}
          value={search.type}
        />
        <Select
          label="Style"
          options={data.options.styles}
          onSelect={(value) => handleSelect('style', value)}
          value={search.style}
        />
        {collectionFilter && (
          <Checkbox
            type="checkbox"
            label="Mini Series"
            onChange={handleCollectionChange}
            value={collectionFilter.value}
            checked={!!search.collectionId}
          />
        )}
      </div>
      {filtersCount > 0 && (
        <Button onClick={resetFilters} variant="ghost" icon={<XIcon />}>
          Clear filters
        </Button>
      )}
    </div>
  );
};

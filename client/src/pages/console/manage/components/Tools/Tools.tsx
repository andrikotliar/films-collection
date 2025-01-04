import { SortingParams, SortingPopup, TextInput } from '@/components';
import { ConfigOption, SortingDirection } from '@/types';
import styles from './Tools.module.css';
import { useDebouncedSearch } from '@/hooks';
import { getRouteApi } from '@tanstack/react-router';

const sortingFields: ConfigOption[] = [
  {
    label: 'Created At',
    value: 'createdAt',
  },
  {
    label: 'Title',
    value: 'title',
  },
  {
    label: 'Status',
    value: 'publishStatus',
  },
];

const routeApi = getRouteApi('/console/manage');

export const Tools = () => {
  const navigate = routeApi.useNavigate();
  const searchParams = routeApi.useSearch();

  const handleSearch = useDebouncedSearch((value) => {
    navigate({
      search: (params) => ({
        ...params,
        q: value,
      }),
    });
  });

  const handleApplySorting = (sorting: SortingParams) => {
    navigate({
      search: (params) => ({
        ...params,
        ...sorting,
      }),
    });
  };

  return (
    <div className={styles.adminFilmsTools}>
      <TextInput
        placeholder="Search film"
        className={styles.searchInput}
        onChange={handleSearch}
      />
      <div>
        <SortingPopup
          fields={sortingFields}
          onSorting={handleApplySorting}
          buttonSize="large"
          defaultSortingField={searchParams.sortingField}
          defaultSortingDirection={
            searchParams.sortingDirection as SortingDirection
          }
        />
      </div>
    </div>
  );
};

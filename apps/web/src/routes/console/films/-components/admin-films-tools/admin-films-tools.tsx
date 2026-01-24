import { type SortingParams, SortingPopup, TextInput, useDebouncedSearch } from '~/shared';
import styles from './admin-films-tools.module.css';
import { getRouteApi } from '@tanstack/react-router';
import type { ListOption } from '@films-collection/shared';
import { SearchIcon } from 'lucide-react';

const sortingFields: ListOption<string>[] = [
  {
    label: 'Created At',
    value: 'createdAt',
  },
  {
    label: 'Title',
    value: 'title',
  },
];

const routeApi = getRouteApi('/console/films');

export const AdminFilmsTools = () => {
  const navigate = routeApi.useNavigate();
  const searchParams = routeApi.useSearch();

  const handleSearch = useDebouncedSearch((value) => {
    navigate({
      search: (params) => ({
        ...params,
        pageIndex: 0,
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
    <div className={styles.admin_films_tools}>
      <TextInput
        placeholder="Search film"
        className={styles.search_input}
        onChange={handleSearch}
        defaultValue={searchParams.q ?? ''}
        icon={<SearchIcon />}
      />
      <SortingPopup
        fields={sortingFields}
        onSorting={handleApplySorting}
        buttonSize="large"
        defaultOrderKey={searchParams.orderKey}
        defaultOrder={searchParams.order}
      />
    </div>
  );
};

import { SortingParams, SortingPopup, TextInput } from '@/ui';
import { ListOption } from '@/types';
import styles from './AdminFilmsTools.module.css';
import { useDebouncedSearch } from '@/hooks';
import { getRouteApi } from '@tanstack/react-router';

const sortingFields: ListOption[] = [
  {
    label: 'Created At',
    value: 'createdAt',
  },
  {
    label: 'Title',
    value: 'title',
  },
];

const routeApi = getRouteApi('/console/manage');

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
          defaultOrderKey={searchParams.orderKey}
          defaultOrder={searchParams.order}
        />
      </div>
    </div>
  );
};

import { type SortingParams, SortingPopup, TextInput, useDebouncedSearch } from '~/shared';
import styles from './admin-films-tools.module.css';
import { getRouteApi } from '@tanstack/react-router';
import { NEW_ITEM_ID, type ListOption } from '@films-collection/shared';
import { SearchIcon } from 'lucide-react';
import { AddItemLink } from '~/routes/console/-shared';

const sortingFields: ListOption<string>[] = [
  {
    label: 'Updated At',
    value: 'updatedAt',
  },
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
    <div className={styles.wrapper}>
      <AddItemLink to="/console/films/$id" params={{ id: NEW_ITEM_ID }}>
        Add new film
      </AddItemLink>
      <TextInput
        placeholder="Search film"
        className={styles.search_input}
        onChange={handleSearch}
        defaultValue={searchParams.q ?? ''}
        icon={<SearchIcon />}
      />
      <div className={styles.sorting}>
        <SortingPopup
          fields={sortingFields}
          onSorting={handleApplySorting}
          defaultOrderKey={searchParams.orderKey ?? 'updatedAt'}
          defaultOrder={searchParams.order ?? 'desc'}
        />
      </div>
    </div>
  );
};

import { TextInput, useDebouncedSearch } from '~/shared';
import { getRouteApi } from '@tanstack/react-router';
import styles from './filters.module.css';
import { SearchIcon } from 'lucide-react';

const routeApi = getRouteApi('/console/people');

export const Filters = () => {
  const navigate = routeApi.useNavigate();
  const search = routeApi.useSearch();

  const handleSearch = useDebouncedSearch((value) => {
    navigate({
      search: (values) => ({
        ...values,
        q: value,
      }),
    });
  });

  return (
    <div className={styles.filters}>
      <TextInput
        placeholder="Search person"
        defaultValue={search.q ?? ''}
        onChange={handleSearch}
        icon={<SearchIcon />}
      />
    </div>
  );
};

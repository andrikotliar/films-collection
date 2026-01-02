import { TextInput, useDebouncedSearch } from '~/shared';
import { getRouteApi } from '@tanstack/react-router';
import styles from './filters.module.css';

const routeApi = getRouteApi('/console/general_/people');

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
      <TextInput label="Search person" defaultValue={search.q ?? ''} onChange={handleSearch} />
    </div>
  );
};

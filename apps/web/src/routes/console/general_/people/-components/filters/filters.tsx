import { Select, TextInput, useDebouncedSearch, fetchInitialDataQuery } from '~/common';
import { getRouteApi } from '@tanstack/react-router';
import styles from './filters.module.css';
import { useSuspenseQuery } from '@tanstack/react-query';

const routeApi = getRouteApi('/console/general_/people');

export const Filters = () => {
  const navigate = routeApi.useNavigate();
  const search = routeApi.useSearch();

  const { data } = useSuspenseQuery(fetchInitialDataQuery());

  const handleSearch = useDebouncedSearch((value) => {
    navigate({
      search: (values) => ({
        ...values,
        q: value,
      }),
    });
  });

  const handleSelectRole = (value: string) => {
    navigate({
      search: (values) => ({
        ...values,
        role: value,
      }),
    });
  };

  return (
    <div className={styles.filters}>
      <TextInput label="Search person" defaultValue={search.q ?? ''} onChange={handleSearch} />
      <Select
        options={data.options.roles}
        onSelect={handleSelectRole}
        value={search.role}
        label="Role"
      />
    </div>
  );
};

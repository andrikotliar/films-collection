import { Select, TextInput, useDebouncedSearch, useSuspenseInitialData } from '~/shared';
import { getRouteApi } from '@tanstack/react-router';
import styles from './filters.module.css';
import type { Enum, PersonRole } from '@films-collection/shared';

const routeApi = getRouteApi('/console/general_/people');

export const Filters = () => {
  const navigate = routeApi.useNavigate();
  const search = routeApi.useSearch();

  const { data } = useSuspenseInitialData();

  const handleSearch = useDebouncedSearch((value) => {
    navigate({
      search: (values) => ({
        ...values,
        q: value,
      }),
    });
  });

  const handleSelectRole = (value: Enum<typeof PersonRole>) => {
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

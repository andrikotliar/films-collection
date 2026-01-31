import { Checkbox, TextInput, useDebouncedSearch } from '~/shared';
import { useNavigate, useSearch } from '@tanstack/react-router';
import styles from './filters.module.css';
import { SearchIcon } from 'lucide-react';

export const Filters = () => {
  const navigate = useNavigate({ from: '/console/people' });
  const search = useSearch({ from: '/console/people' });

  const handleSearch = useDebouncedSearch((value) => {
    navigate({
      search: (values) => ({
        ...values,
        q: value,
      }),
    });
  });

  const handleFilterSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    navigate({
      search: (values) => ({
        ...values,
        selected: event.target.checked,
      }),
    });
  };

  return (
    <div className={styles.filters}>
      <TextInput
        placeholder="Search person"
        defaultValue={search.q ?? ''}
        onChange={handleSearch}
        icon={<SearchIcon />}
      />
      <Checkbox
        onChange={handleFilterSelected}
        checked={search.selected}
        type="checkbox"
        label="Filter selected"
      />
    </div>
  );
};

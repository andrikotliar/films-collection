import { useLocation } from '@tanstack/react-router';
import { SearchIcon } from 'lucide-react';
import { TextInput, useDebouncedSearch } from '~/shared';

type ListSearchProps = {
  onSearch: (value: string) => void;
};

export const ListSearch = ({ onSearch }: ListSearchProps) => {
  const location = useLocation();
  const handleSearch = useDebouncedSearch(onSearch);

  return (
    <TextInput
      defaultValue={location.search.q ?? ''}
      onChange={handleSearch}
      icon={<SearchIcon />}
      placeholder="Search..."
    />
  );
};

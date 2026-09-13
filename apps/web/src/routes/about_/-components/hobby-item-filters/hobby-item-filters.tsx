import {
  getHobbyRelatedCollectionsQueryOptions,
  Select,
  TextInput,
  useDebouncedSearch,
} from '~/shared';
import styles from './hobby-item-filters.module.css';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';

type HobbyItemFiltersProps = {
  hobbyId: string;
};

export const HobbyItemFilters = ({ hobbyId }: HobbyItemFiltersProps) => {
  const { data } = useSuspenseQuery(getHobbyRelatedCollectionsQueryOptions(hobbyId));
  const navigate = useNavigate({ from: '/about/$id' });
  const search = useSearch({ from: '/about_/$id' });

  const handleCollectionFilter = (value: number) => {
    navigate({
      to: '/about/$id',
      search: (prev) => ({
        ...prev,
        collectionId: value,
      }),
      params: {
        id: hobbyId,
      },
    });
  };

  const handleSearch = useDebouncedSearch((value) => {
    navigate({
      to: '/about/$id',
      search: (prev) => ({
        ...prev,
        q: value,
      }),
      params: {
        id: hobbyId,
      },
    });
  });

  return (
    <div className={styles.wrapper}>
      <TextInput label="Search item" onChange={handleSearch} />
      <Select
        options={data}
        label="Collections"
        onSelect={handleCollectionFilter}
        value={search.collectionId}
      />
    </div>
  );
};

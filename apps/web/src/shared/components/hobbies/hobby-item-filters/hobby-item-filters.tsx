import { getHobbyRelatedCollectionsQueryOptions, Select, TextInput } from '~/shared';
import styles from './hobby-item-filters.module.css';
import { useSuspenseQuery } from '@tanstack/react-query';

type PartialFilters = {
  [key: string]: any;
  collectionId?: number;
};

type HobbyItemFiltersProps<T extends PartialFilters> = {
  hobbyId: string;
  onFilter: VoidFunction;
  onSearch: VoidFunction;
  search: T;
};

export const HobbyItemFilters = <T extends PartialFilters>({
  hobbyId,
  onFilter,
  onSearch,
  search,
}: HobbyItemFiltersProps<T>) => {
  const { data } = useSuspenseQuery(getHobbyRelatedCollectionsQueryOptions(hobbyId));

  return (
    <div className={styles.wrapper}>
      <TextInput label="Search item" onChange={onSearch} />
      <Select options={data} label="Collections" onSelect={onFilter} value={search.collectionId} />
    </div>
  );
};

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getFilterParams } from '@/helpers';

type FilterParams = { [key: string]: any };

type UseFilter = {
  filterParams: FilterParams;
  setSearchParams: (params: FilterParams) => void;
  updateFilter: (params: FilterParams) => void;
  resetFilter: VoidFunction;
};

const useQueryFilter = (): UseFilter => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterParams, setFilterParams] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const filterParams = getFilterParams(searchParams);
    setFilterParams(filterParams);
  }, [searchParams]);

  const updateFilter = (data: any) => {
    setSearchParams(data);
  };

  const resetFilter = () => {
    setSearchParams({});
  };

  return { filterParams, setSearchParams, updateFilter, resetFilter };
};

export { useQueryFilter };

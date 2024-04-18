import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getFilterParams } from '@/helpers';

type FilterParams = { [key: string]: any };

type HandleChangeParam = (param: string, value?: string | number) => void;

type UseFilter = {
  filterParams: FilterParams;
  setSearchParams: (params: FilterParams) => void;
  updateFilter: (params: FilterParams) => void;
  resetFilter: VoidFunction;
  updateParam: HandleChangeParam;
  deleteParam: HandleChangeParam;
};

const useQueryFilter = (): UseFilter => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterParams = useMemo(() => {
    return getFilterParams(searchParams);
  }, [searchParams]);

  const updateFilter = (data: any) => {
    setSearchParams(data);
  };

  const resetFilter = () => {
    setSearchParams({});
  };

  const deleteParam: HandleChangeParam = (param, value) => {
    const currentValue = value ? String(value) : undefined;

    searchParams.delete(param, currentValue);
    setSearchParams(searchParams);
  };

  const updateParam: HandleChangeParam = (param, value) => {
    if (filterParams[param] && !value) {
      searchParams.delete(param);
      setSearchParams(searchParams);
      return;
    }

    if (!filterParams[param]) {
      searchParams.set(param, String(value));
      setSearchParams(searchParams);
      return;
    }

    searchParams.append(param, String(value));
    setSearchParams(searchParams);
  };

  return {
    filterParams,
    setSearchParams,
    updateFilter,
    resetFilter,
    updateParam,
    deleteParam,
  };
};

export { useQueryFilter };

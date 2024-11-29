import { useMemo, useState } from 'react';
import { getFilterParams } from '@/helpers';

type FilterParams = { [key: string]: any };

type HandleChangeParam = (param: string, value?: string | number) => void;

type UseFilter = {
  filterParams: any;
  setSearchParams: (params: any) => void;
  updateFilter: (params: FilterParams) => void;
  resetFilter: VoidFunction;
  updateParam: HandleChangeParam;
  deleteParam: HandleChangeParam;
};

const useQueryFilter = (): UseFilter => {
  // TODO: use tanstack router search params instead of placeholder
  const [searchParams, setSearchParams] = useState(new URLSearchParams());

  const filterParams = useMemo(() => {
    return getFilterParams(searchParams);
  }, [searchParams]);

  const updateFilter = (data: any) => {
    setSearchParams(data);
  };

  const resetFilter = () => {
    setSearchParams(new URLSearchParams());
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

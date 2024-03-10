import { getFilterParams } from '@/helpers';
import { DynamicObject } from '@/common';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useFilter = (): [
  DynamicObject,
  (params: URLSearchParams) => void,
] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterParams, setFilterParams] = useState<DynamicObject>({});

  useEffect(() => {
    const filterParams = getFilterParams(searchParams);
    setFilterParams(filterParams);
  }, [searchParams]);

  return [filterParams, setSearchParams];
};

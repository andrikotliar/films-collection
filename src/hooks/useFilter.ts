import { getFilterParams } from '@/helpers';
import { DynamicObject } from '@/types';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useFilter = (): [DynamicObject, any] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterParams, setFilterParams] =
    useState<DynamicObject>({});

  useEffect(() => {
    const filterParams = getFilterParams(searchParams);
    setFilterParams(filterParams);
  }, [searchParams]);

  return [filterParams, setSearchParams];
};

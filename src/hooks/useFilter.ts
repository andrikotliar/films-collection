import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getFilterParams } from '@/helpers';

export const useFilter = (): [
  { [key: string]: any },
  (params: { [key: string]: any }) => void,
] => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterParams, setFilterParams] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const filterParams = getFilterParams(searchParams);
    setFilterParams(filterParams);
  }, [searchParams]);

  return [filterParams, setSearchParams];
};

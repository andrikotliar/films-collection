import { fetchData } from '@/api';
import { useQuery } from '@tanstack/react-query';

const useData = () => {
  return useQuery({
    queryKey: ['films-collection-data'],
    queryFn: fetchData,
  });
};

export { useData };

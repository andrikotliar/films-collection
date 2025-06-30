import { GenresApi } from '@/api';
import { queryOptions } from '@tanstack/react-query';

export const fetchGenresListQuery = () => {
  return queryOptions({
    queryKey: ['genres', 'list'],
    queryFn: GenresApi.getBaseDataList,
  });
};

import { GenresApi } from '@/api';
import { queryKeys } from '@/common/configs';
import { queryOptions } from '@tanstack/react-query';

export const fetchGenresListQuery = () => {
  return queryOptions({
    queryKey: [queryKeys.genres.list],
    queryFn: GenresApi.getBaseDataList,
  });
};

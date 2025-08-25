import { StudiosApi } from '@/api';
import { queryKeys } from '@/common/configs';
import { queryOptions } from '@tanstack/react-query';

export const fetchStudiosListQuery = () => {
  return queryOptions({
    queryKey: [queryKeys.studios.list],
    queryFn: StudiosApi.getBaseDataList,
  });
};

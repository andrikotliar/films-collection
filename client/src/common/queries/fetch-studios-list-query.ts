import { StudiosApi } from '@/api';
import { queryOptions } from '@tanstack/react-query';

export const fetchStudiosListQuery = () => {
  return queryOptions({
    queryKey: ['studios', 'list'],
    queryFn: StudiosApi.getBaseDataList,
  });
};

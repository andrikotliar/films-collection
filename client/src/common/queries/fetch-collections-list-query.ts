import { CollectionsApi } from '@/api';
import { queryOptions } from '@tanstack/react-query';

export const fetchCollectionsListQuery = () => {
  return queryOptions({
    queryKey: ['collections', 'list'],
    queryFn: CollectionsApi.getBaseDataList,
  });
};

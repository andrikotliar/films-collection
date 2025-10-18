import { CollectionsApi } from '@/api';
import { queryKeys } from '@/common/configs';
import { queryOptions } from '@tanstack/react-query';

export const fetchCollectionsListQuery = () => {
  return queryOptions({
    queryKey: [queryKeys.collections.list],
    queryFn: CollectionsApi.getBaseDataList,
  });
};

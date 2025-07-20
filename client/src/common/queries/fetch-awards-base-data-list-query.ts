import { AwardsApi } from '@/api';
import { queryOptions } from '@tanstack/react-query';

export const fetchAwardsBaseDataListQuery = () => {
  return queryOptions({
    queryKey: ['awards', 'list'],
    queryFn: AwardsApi.getBaseDataList,
  });
};

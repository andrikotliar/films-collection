import { AwardsApi } from '~/api';
import { queryKeys } from '~/shared/configs';
import { queryOptions } from '@tanstack/react-query';

export const fetchAwardsBaseDataListQuery = () => {
  return queryOptions({
    queryKey: [queryKeys.awards.list],
    queryFn: AwardsApi.getBaseDataList,
  });
};

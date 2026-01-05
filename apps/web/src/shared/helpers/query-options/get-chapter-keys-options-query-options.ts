import { queryOptions } from '@tanstack/react-query';
import { api, queryKeys } from '~/shared/services';

export const getChapterKeysOptionsQueryOptions = () => {
  return queryOptions({
    queryKey: queryKeys.chapterKeys.options.list(),
    queryFn: api.chapterKeys.options.list,
  });
};

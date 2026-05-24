import { queryOptions } from '@tanstack/react-query';
import { api, queryKey } from '~/shared/services';

export const getChapterKeysOptionsQueryOptions = () => {
  return queryOptions({
    queryKey: [queryKey('chapterKeys.getOptions')],
    queryFn: api.chapterKeys.getOptions,
  });
};

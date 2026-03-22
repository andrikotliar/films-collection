import { queryOptions } from '@tanstack/react-query';
import { api } from '~/shared/services';

export const getChapterKeysOptionsQueryOptions = () => {
  return queryOptions({
    queryKey: [api.chapterKeys.getOptions.staticKey],
    queryFn: () => api.chapterKeys.getOptions.exec(),
  });
};

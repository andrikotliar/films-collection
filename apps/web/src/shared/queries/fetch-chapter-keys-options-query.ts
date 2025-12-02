import { ChapterKeysApi } from '~/api';
import { queryOptions } from '@tanstack/react-query';

export const fetchChapterKeysOptionsQuery = () => {
  return queryOptions({
    queryKey: ['chapter-keys'],
    queryFn: ChapterKeysApi.getListOptions,
  });
};

import { apiClient } from '@/services';
import { queryOptions } from '@tanstack/react-query';

export const fetchPendingFilmsListQuery = () => {
  return queryOptions({
    queryKey: ['pending-films'],
    queryFn: () => {
      return apiClient.get('/pending-films');
    },
  });
};

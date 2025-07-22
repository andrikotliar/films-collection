import { CollectionEventsApi } from '@/api';
import { queryKeys, type CollectionEvent } from '@/common';
import type { FormValues } from '@/routes/console/collection-events/-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateCollectionEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormValues) => {
      const { isOneDayEvent, ...values } = data;

      if (isOneDayEvent) {
        const payload: Omit<CollectionEvent, 'id'> = {
          ...values,
          endDate: values.startDate,
          endMonth: values.startMonth,
        };

        return CollectionEventsApi.createEvent(payload);
      }

      return CollectionEventsApi.createEvent(values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.collectionEvent.adminList],
      });
    },
  });
};

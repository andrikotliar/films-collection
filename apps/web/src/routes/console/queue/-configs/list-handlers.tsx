import { filmStatusOrder } from '@films-collection/shared';
import { SquareArrowRightIcon } from 'lucide-react';
import type { AdditionalHandler } from '~/routes/console/-shared/components/item-row/item-row';
import { api, queryClient, toaster, type ApiResponse } from '~/shared';

export const listHandlers: Array<
  AdditionalHandler<ApiResponse<typeof api.films.getAdminIncompleteFilmsList.exec>['list'][number]>
> = [
  {
    id: 'promote-status',
    icon: <SquareArrowRightIcon />,
    action: async (data) => {
      const curStatusIndex = filmStatusOrder.findIndex((status) => status === data.status);

      if (curStatusIndex === -1) {
        toaster.error(`Status ${data.status} is unknown`);
        return;
      }

      const nextStatus = filmStatusOrder[curStatusIndex + 1];

      if (!nextStatus) {
        toaster.error(`Next status after ${data.status} is not found`);
        return;
      }

      await api.films.update.exec({
        params: {
          id: data.id,
        },
        input: {
          status: nextStatus,
        },
      });

      await queryClient.invalidateQueries({
        queryKey: [api.films.getAdminIncompleteFilmsList.staticKey],
      });
    },
  },
];

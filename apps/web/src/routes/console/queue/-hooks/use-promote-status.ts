import type { Enum, FilmStatus } from '@films-collection/shared';
import { useMutation } from '@tanstack/react-query';
import { api } from '~/shared';

export const usePromoteStatus = (nextStatus: Enum<typeof FilmStatus>) => {
  return useMutation({
    mutationFn: (id: number) =>
      api.films.update.exec({
        input: {
          status: nextStatus,
        },
        params: { id },
      }),
  });
};

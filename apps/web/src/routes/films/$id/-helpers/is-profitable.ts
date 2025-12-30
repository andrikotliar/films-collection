import type { DataLinkProps } from '~/routes/films/$id/-components';
import type { api, ApiResponse } from '~/shared';

export const isProfitable = (
  film: ApiResponse<typeof api.films.get>,
): DataLinkProps['markerColor'] => {
  if (!film.budget || !film.boxOffice) {
    return 'white';
  }

  return film.boxOffice > film.budget ? 'green' : 'red';
};

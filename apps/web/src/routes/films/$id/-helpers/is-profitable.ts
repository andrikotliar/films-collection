import type { DataLinkProps } from '~/routes/films/$id/-components';
import type { api, ExtractResponseType } from '~/shared';

export const isProfitable = (
  film: ExtractResponseType<typeof api.films.get>,
): DataLinkProps['markerColor'] => {
  if (!film.budget || !film.boxOffice) {
    return 'white';
  }

  return film.boxOffice > film.budget ? 'green' : 'red';
};

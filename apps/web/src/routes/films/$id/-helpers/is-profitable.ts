import type { DataLinkProps } from '~/routes/films/$id/-components';
import type { FilmDetails } from '~/shared';

export const isProfitable = (film: FilmDetails): DataLinkProps['markerColor'] => {
  if (!film.budget || !film.boxOffice) {
    return 'white';
  }

  return film.boxOffice > film.budget ? 'green' : 'red';
};

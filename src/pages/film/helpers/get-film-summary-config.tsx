import { FilmData } from '@/common/types';
import { TagLink } from '../components/tag-link/TagLink';
import { buildQueryLink } from '@/helpers';
import { ReleaseDate } from '../components/release-date/ReleaseDate';
import { TagLinksGroup } from '../components/tag-links-group/TagLinksGroup';
import { SummaryConfig } from '../types';
import { getSeriesSummaryConfig } from './get-series-summary-config';

const getFilmSummaryConfig = (
  film: FilmData,
  activeIndex: number,
): SummaryConfig[] => {
  const seriesExtension = getSeriesSummaryConfig(film, activeIndex);

  return [
    {
      id: 'releaseDate',
      title: 'Release Date',
      content: <ReleaseDate value={film.releaseDate[activeIndex]} />,
    },
    {
      id: 'genres',
      title: 'Genres',
      content: <TagLinksGroup items={film.genres} basePath="genres" />,
    },
    {
      id: 'duration',
      title: 'Runtime',
      content: (
        <TagLink
          path={buildQueryLink({ duration: film.duration })}
          variant="gray"
        >
          {film.duration} min
        </TagLink>
      ),
    },
    {
      id: 'countries',
      title: 'Origin countries',
      content: (
        <TagLinksGroup
          basePath="countries"
          items={film.countries}
          variant="gray"
        />
      ),
    },
    {
      id: 'production',
      title: 'Production studios',
      content: (
        <TagLinksGroup
          basePath="production"
          items={film.production}
          variant="gray"
        />
      ),
    },
    {
      id: 'collections',
      title: 'Collections',
      content: (
        <TagLinksGroup
          basePath="collections"
          items={film.collections.map((collection) => collection.title)}
          variant="pink"
        />
      ),
    },
    ...seriesExtension,
  ];
};

export { getFilmSummaryConfig, type SummaryConfig };

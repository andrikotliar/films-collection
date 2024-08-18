import { FilmData, SeriesExtension } from '@/common/types';
import { ReactNode } from 'react';
import { TagLink } from '../components/tag-link/TagLink';
import { buildQueryLink } from '@/helpers';
import { ReleaseDate } from '../components/release-date/ReleaseDate';
import { TagLinksGroup } from '../components/tag-links-group/TagLinksGroup';

// const getSeriesExtension = (series?: SeriesExtension): LinkGroup[] => {
//   if (!series) return [];

//   return [
//     {
//       value: series.seasons.length,
//       id: 'seasons',
//       title: 'Seasons count',
//       suffix: `season${series.seasons.length > 1 ? 's' : ''}`,
//     },
//     {
//       value: series.episodesTotal,
//       id: 'episodes',
//       title: 'All episodes count',
//       suffix: `episode${series.episodesTotal > 1 ? 's' : ''}`,
//     },
//   ];
// };

type SummaryConfig = {
  id: string;
  title: string;
  content: ReactNode;
};

const getFilmSummaryConfig = (
  film: FilmData,
  activeIndex: number,
): SummaryConfig[] => {
  const isSeries = film.type.includes('Series');

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
  ];
};

export { getFilmSummaryConfig, type SummaryConfig };

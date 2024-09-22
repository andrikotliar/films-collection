import { FilmData } from '@/types';
import { TagLink } from '../components/tag-link/TagLink';
import { buildQueryLink } from '@/helpers';
import { ReleaseDate } from '../components/release-date/ReleaseDate';
import { TagLinksGroup } from '../components/tag-links-group/TagLinksGroup';
import { SummaryConfig } from '../types';
import { genreTitles } from '@/titles/genre-titles';
import { collectionTitles, countryTitles, studioTitles } from '@/titles';

const getFilmSummaryConfig = (film: FilmData): SummaryConfig[] => {
  return [
    {
      id: 'releaseDate',
      title: 'Release Date',
      content: <ReleaseDate value={film.releaseDate} />,
    },
    {
      id: 'genres',
      title: 'Genres',
      content: (
        <TagLinksGroup
          items={film.genres}
          basePath="genres"
          titles={genreTitles}
        />
      ),
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
          titles={countryTitles}
        />
      ),
    },
    {
      id: 'production',
      title: 'Production studios',
      content: (
        <TagLinksGroup
          basePath="production"
          items={film.studios}
          variant="gray"
          titles={studioTitles}
        />
      ),
    },
    {
      id: 'collections',
      title: 'Collections',
      content: (
        <TagLinksGroup
          basePath="collections"
          items={film.collections.map((collection) => collection.key)}
          variant="pink"
          titles={collectionTitles}
        />
      ),
    },
  ];
};

export { getFilmSummaryConfig, type SummaryConfig };

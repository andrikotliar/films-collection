import { FilmData } from '@/types';
import { buildQueryLink } from '@/helpers';
import { MoneyValue, ReleaseDate, TagLink, TagLinksGroup } from '../components';
import { SummaryConfig } from '../types';
import { genreTitles } from '@/titles/genre-titles';
import { collectionTitles, countryTitles, studioTitles } from '@/titles';
import { TitleType } from '@/enums';
import { checkHasBoxOfficeBenefit } from './check-box-office-has-benefit';

const getFilmSummaryConfig = (film: FilmData): SummaryConfig[] => {
  const isBoxOfficeSuccessful = checkHasBoxOfficeBenefit(
    film.budget ?? 0,
    film.boxOffice ?? 0,
  );

  const values: SummaryConfig[] = [
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
      id: 'releaseDate',
      title: 'Release Date',
      content: <ReleaseDate value={film.releaseDate} />,
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
      isHidden: film.countries.length === 0,
    },
    {
      id: 'studios',
      title: 'Production studios',
      content: (
        <TagLinksGroup
          basePath="studios"
          items={film.studios}
          variant="gray"
          titles={studioTitles}
        />
      ),
      isHidden: film.studios.length === 0,
    },
    {
      id: 'collections',
      title: 'Collections',
      content: (
        <TagLinksGroup
          basePath="collection"
          items={film.collections.map((collection) => collection.key)}
          variant="pink"
          titles={collectionTitles}
        />
      ),
      isHidden: film.collections.length === 0,
    },
    {
      id: 'budget',
      title: 'Budget',
      content: <MoneyValue value={film.budget} />,
      isHidden: film.type === TitleType.SERIES,
    },
    {
      id: 'boxOffice',
      title: 'Box Office',
      content: (
        <MoneyValue
          value={film.boxOffice}
          status={isBoxOfficeSuccessful ? 'success' : 'failure'}
        />
      ),
      isHidden: film.type === TitleType.SERIES,
    },
  ];

  return values.filter((item) => !item.isHidden);
};

export { getFilmSummaryConfig, type SummaryConfig };

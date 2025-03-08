import { FilmDetails } from '@/types';
import { getFormattedMoneyValue, getPluralWord } from '@/helpers';
import {
  LinksGroupWrapper,
  ReleaseDate,
  TagLink,
  TagLinksGroup,
} from '../components';
import { SummaryConfig } from '../types';
import { checkHasBoxOfficeBenefit } from './check-box-office-has-benefit';

export const getFilmSummaryConfig = (film: FilmDetails): SummaryConfig[] => {
  const isBoxOfficeSuccessful = checkHasBoxOfficeBenefit(
    film.budget ?? 0,
    film.boxOffice ?? 0,
  );

  const values: SummaryConfig[] = [
    {
      id: 'genres',
      title: 'Genres',
      content: <TagLinksGroup items={film.genres} basePath="genreIds" />,
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
          basePath="/"
          query={{ duration: film.duration }}
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
          basePath="countryIds"
          items={film.countries}
          variant="gray"
        />
      ),
      isHidden: film.countries.length === 0,
    },
    {
      id: 'studios',
      title: 'Production studios',
      content: (
        <TagLinksGroup
          basePath="studioIds"
          items={film.studios}
          variant="gray"
        />
      ),
      isHidden: film.studios.length === 0,
    },
    {
      id: 'collections',
      title: 'Collections',
      content: (
        <LinksGroupWrapper>
          {film.collections.map((item) => (
            <TagLink
              basePath="/"
              query={{
                collectionId: item.id,
              }}
              key={item.id}
              variant="pink"
            >
              {item.title}
            </TagLink>
          ))}
        </LinksGroupWrapper>
      ),
      isHidden: film.collections.length === 0,
    },
    {
      id: 'budget',
      title: 'Budget',
      content: (
        <div>
          {film.budget ? (
            <TagLink
              basePath="/"
              query={{ budget: film.budget }}
              variant="gray"
            >
              {getFormattedMoneyValue(film.budget)}
            </TagLink>
          ) : (
            'N/A'
          )}
        </div>
      ),
      isHidden: film.type === 'SERIES',
    },
    {
      id: 'boxOffice',
      title: 'Box Office',
      content: (
        <div>
          {film.boxOffice ? (
            <TagLink
              basePath="/"
              query={{ boxOffice: film.boxOffice }}
              variant={isBoxOfficeSuccessful ? 'green' : 'red'}
            >
              {getFormattedMoneyValue(film.boxOffice)}
            </TagLink>
          ) : (
            'N/A'
          )}
        </div>
      ),
      isHidden: film.type === 'SERIES',
    },
    {
      id: 'seriesStats',
      title: 'Series Summary',
      content: (
        <LinksGroupWrapper>
          <TagLink
            variant="mint"
            basePath="/"
            query={{
              seasonsTotal: film.seriesExtension?.seasonsTotal ?? 1,
            }}
          >
            {film.seriesExtension?.seasonsTotal}{' '}
            {getPluralWord('season', film.seriesExtension?.seasonsTotal)}
          </TagLink>
          <TagLink
            basePath="/"
            variant="mint"
            query={{
              episodesTotal: film.seriesExtension?.episodesTotal ?? 0,
            }}
          >
            {film.seriesExtension?.episodesTotal} episodes
          </TagLink>
        </LinksGroupWrapper>
      ),
      isHidden: film.type !== 'SERIES',
    },
  ];

  return values.filter((item) => !item.isHidden);
};

import { FilmData } from '@/types';
import { getFormattedMoneyValue, getPluralWord } from '@/helpers';
import {
  LinksGroupWrapper,
  ReleaseDate,
  SeasonsRow,
  TagLink,
  TagLinksGroup,
} from '../components';
import { SummaryConfig } from '../types';
import { TitleType } from '@/enums';
import { checkHasBoxOfficeBenefit } from './check-box-office-has-benefit';

export const getFilmSummaryConfig = (film: FilmData): SummaryConfig[] => {
  const isBoxOfficeSuccessful = checkHasBoxOfficeBenefit(
    film.budget ?? 0,
    film.boxOffice ?? 0,
  );

  const values: SummaryConfig[] = [
    {
      id: 'genres',
      title: 'Genres',
      content: (
        <TagLinksGroup items={film.genres} route="/" queryKey="genres" />
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
          path="/"
          searchParams={{ duration: film.duration }}
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
          route="/"
          queryKey="countries"
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
          route="/"
          queryKey="studios"
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
              path="/"
              searchParams={{
                collection: item.collection._id,
              }}
              key={item.collection._id}
              variant="pink"
            >
              {item.collection.title}
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
              path="/"
              searchParams={{ budget: film.budget }}
              variant="gray"
            >
              {getFormattedMoneyValue(film.budget)}
            </TagLink>
          ) : (
            'N/A'
          )}
        </div>
      ),
      isHidden: film.type === TitleType.SERIES,
    },
    {
      id: 'boxOffice',
      title: 'Box Office',
      content: (
        <div>
          {film.boxOffice ? (
            <TagLink
              path="/"
              searchParams={{ boxOffice: film.boxOffice }}
              variant={isBoxOfficeSuccessful ? 'green' : 'red'}
            >
              {getFormattedMoneyValue(film.boxOffice)}
            </TagLink>
          ) : (
            'N/A'
          )}
        </div>
      ),
      isHidden: film.type === TitleType.SERIES,
    },
    {
      id: 'seriesStats',
      title: 'Series Summary',
      content: (
        <LinksGroupWrapper>
          <TagLink
            variant="mint"
            path="/"
            searchParams={{
              seasonsTotal: film.seriesExtension?.seasons.length ?? 1,
            }}
          >
            {film.seriesExtension?.seasons.length}{' '}
            {getPluralWord('season', film.seriesExtension?.seasons.length)}
          </TagLink>
          <TagLink
            variant="mint"
            path="/"
            searchParams={{
              episodesTotal: film.seriesExtension?.episodesTotal ?? 0,
            }}
          >
            {film.seriesExtension?.episodesTotal} episodes
          </TagLink>
        </LinksGroupWrapper>
      ),
      isHidden: film.type !== TitleType.SERIES,
    },
    {
      id: 'seasonsDetails',
      title: 'Seasons Details',
      content: <SeasonsRow seasons={film.seriesExtension?.seasons ?? []} />,
      isHidden: film.type !== TitleType.SERIES,
    },
  ];

  return values.filter((item) => !item.isHidden);
};

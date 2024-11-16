import { FilmData } from '@/types';
import {
  buildQueryLink,
  getFormattedMoneyValue,
  getPluralWord,
} from '@/helpers';
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

const getFilmSummaryConfig = (film: FilmData): SummaryConfig[] => {
  const isBoxOfficeSuccessful = checkHasBoxOfficeBenefit(
    film.budget ?? 0,
    film.boxOffice ?? 0,
  );

  const values: SummaryConfig[] = [
    {
      id: 'genres',
      title: 'Genres',
      content: <TagLinksGroup items={film.genres} basePath="genres" />,
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
        />
      ),
      isHidden: film.countries.length === 0,
    },
    {
      id: 'studios',
      title: 'Production studios',
      content: (
        <TagLinksGroup basePath="studios" items={film.studios} variant="gray" />
      ),
      isHidden: film.studios.length === 0,
    },
    {
      id: 'collections',
      title: 'Collections',
      content: (
        <TagLinksGroup
          basePath="collection"
          items={film.collections.map((collection) => collection.title)}
          variant="pink"
        />
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
              path={buildQueryLink({ budget: film.budget })}
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
              path={buildQueryLink({ boxOffice: film.boxOffice })}
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
            path={buildQueryLink({
              seasonsTotal: film.seriesExtension?.seasons.length ?? 1,
            })}
          >
            {film.seriesExtension?.seasons.length}{' '}
            {getPluralWord('season', film.seriesExtension?.seasons.length)}
          </TagLink>
          <TagLink
            variant="mint"
            path={buildQueryLink({
              episodesTotal: film.seriesExtension?.episodesTotal ?? 0,
            })}
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

export { getFilmSummaryConfig, type SummaryConfig };

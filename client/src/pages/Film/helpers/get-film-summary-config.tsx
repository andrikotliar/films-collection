import { FilmData } from '@/types';
import { buildQueryLink, getFormattedMoneyValue } from '@/helpers';
import {
  LinksGroupWrapper,
  ReleaseDate,
  TagLink,
  TagLinksGroup,
  TrailerButton,
} from '../components';
import { SummaryConfig } from '../types';
import { genreTitles } from '@/titles/genre-titles';
import { collectionTitles, countryTitles, studioTitles } from '@/titles';
import { TitleType } from '@/enums';
import { checkHasBoxOfficeBenefit } from './check-box-office-has-benefit';
import { PlayIcon } from 'lucide-react';
import styles from './styles.module.css';

const getFilmSummaryConfig = (film: FilmData): SummaryConfig[] => {
  const isBoxOfficeSuccessful = checkHasBoxOfficeBenefit(
    film.budget ?? 0,
    film.boxOffice ?? 0,
  );

  const values: SummaryConfig[] = [
    {
      id: 'trailer',
      title: 'Trailer',
      content: (
        <TrailerButton
          trailer={film.trailer ?? ''}
          icon={<PlayIcon size={18} className={styles.playIcon} />}
          className={styles.trailerButton}
        />
      ),
      isHidden: !film.trailer,
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
      id: 'seasonsTotal',
      title: 'Seasons total',
      content: (
        <TagLink
          variant="mint"
          path={buildQueryLink({
            seasonsTotal: film.seriesExtension?.seasons.length ?? 1,
          })}
        >
          {film.seriesExtension?.seasons.length}
        </TagLink>
      ),
      isHidden: film.type !== TitleType.SERIES,
    },
    {
      id: 'episodesTotal',
      title: 'Episodes total',
      content: (
        <TagLink
          variant="mint"
          path={buildQueryLink({
            episodesTotal: film.seriesExtension?.episodesTotal ?? 0,
          })}
        >
          {film.seriesExtension?.episodesTotal}
        </TagLink>
      ),
      isHidden: film.type !== TitleType.SERIES,
    },
  ];

  return values.filter((item) => !item.isHidden);
};

export { getFilmSummaryConfig, type SummaryConfig };

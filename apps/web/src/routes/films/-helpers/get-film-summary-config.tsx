import type { ReactNode } from 'react';
import { type FilmDetails, getFormattedMoneyValue, getPluralWord } from '~/common';
import { LinksGroupWrapper, DataLink, LinksGroup, BoxOfficeValue, Dates } from '../-components';

export type SummaryConfig = {
  id: string;
  title: string;
  content: ReactNode;
  isHidden?: boolean;
};

export const getFilmSummaryConfig = (film: FilmDetails): SummaryConfig[] => {
  const values: SummaryConfig[] = [
    {
      id: 'genres',
      title: 'Genres',
      content: <LinksGroup items={film.genres} basePath="genreIds" />,
    },
    {
      id: 'releaseDate',
      title: film.type === 'SERIES' ? 'Ongoing dates' : 'Release Date',
      content: (
        <Dates releaseDate={film.releaseDate} finishedAt={film.seriesExtension?.finishedAt} />
      ),
    },
    {
      id: 'duration',
      title: 'Runtime',
      content: (
        <DataLink basePath="/" query={{ duration: film.duration }}>
          {film.duration} min
        </DataLink>
      ),
    },
    {
      id: 'countries',
      title: 'Origin countries',
      content: <LinksGroup basePath="countryIds" items={film.countries} />,
      isHidden: film.countries.length === 0,
    },
    {
      id: 'studios',
      title: 'Production studios',
      content: <LinksGroup basePath="studioIds" items={film.studios} />,
      isHidden: film.studios.length === 0,
    },
    {
      id: 'collections',
      title: 'Collections',
      content: (
        <LinksGroupWrapper>
          {film.collections.map((item) => (
            <DataLink
              basePath="/"
              query={{
                collectionId: item.id,
              }}
              key={item.id}
            >
              {item.title}
            </DataLink>
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
            <DataLink basePath="/" query={{ budget: film.budget }}>
              {getFormattedMoneyValue(film.budget)}
            </DataLink>
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
          {film.budget && film.boxOffice ? (
            <BoxOfficeValue budget={film.budget} boxOffice={film.boxOffice} />
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
          <DataLink
            basePath="/"
            query={{
              seasonsTotal: film.seriesExtension?.seasonsTotal ?? 1,
            }}
          >
            {film.seriesExtension?.seasonsTotal}{' '}
            {getPluralWord('season', film.seriesExtension?.seasonsTotal)}
          </DataLink>
          <DataLink
            basePath="/"
            query={{
              episodesTotal: film.seriesExtension?.episodesTotal ?? 0,
            }}
          >
            {film.seriesExtension?.episodesTotal} episodes
          </DataLink>
        </LinksGroupWrapper>
      ),
      isHidden: film.type !== 'SERIES',
    },
  ];

  return values.filter((item) => !item.isHidden);
};

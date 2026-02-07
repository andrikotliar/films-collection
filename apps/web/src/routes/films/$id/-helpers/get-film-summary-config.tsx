import { getFormattedMoneyValue, getPluralWord, type api, type ApiResponse } from '~/shared';
import { LinksGroupWrapper, DataLink, LinksGroup, Dates } from '../-components';
import {
  BookIcon,
  BuildingIcon,
  CalendarIcon,
  ClockIcon,
  GlobeIcon,
  GroupIcon,
  HandCoinsIcon,
  TvIcon,
  WalletIcon,
} from 'lucide-react';

export type SummaryConfig = {
  id: string;
  title: string;
  content: React.ReactNode;
  icon: React.ReactNode;
  isHidden?: boolean;
};

export const getFilmSummaryConfig = (film: ApiResponse<typeof api.films.get>): SummaryConfig[] => {
  const values: SummaryConfig[] = [
    {
      id: 'genres',
      title: 'Genres',
      content: <LinksGroup items={film.genres} basePath="genreIds" />,
      icon: <BookIcon />,
    },
    {
      id: 'releaseDate',
      title: film.type === 'SERIES' ? 'Ongoing dates' : 'Release Date',
      icon: <CalendarIcon />,
      content: (
        <Dates
          releaseDate={film.releaseDate.toString()}
          finishedAt={film.seriesExtension?.finishedAt?.toString()}
        />
      ),
    },
    {
      id: 'duration',
      title: 'Runtime',
      icon: <ClockIcon />,
      content: (
        <DataLink basePath="/" query={{ duration: film.duration }}>
          {film.duration} min
        </DataLink>
      ),
    },
    {
      id: 'countries',
      title: 'Origin countries',
      icon: <GlobeIcon />,
      content: <LinksGroup basePath="countryIds" items={film.countries} />,
    },
    {
      id: 'studios',
      title: 'Production studios',
      icon: <BuildingIcon />,
      content: <LinksGroup basePath="studioIds" items={film.studios} />,
    },
    {
      id: 'collections',
      title: 'Collections',
      icon: <GroupIcon />,
      content: <LinksGroup basePath="collectionId" items={film.collections} />,
    },
    {
      id: 'budget',
      title: 'Budget',
      icon: <WalletIcon />,
      content: (
        <DataLink basePath="/" query={{ budget: film.budget }}>
          {getFormattedMoneyValue(film.budget)}
        </DataLink>
      ),
      isHidden: film.type === 'SERIES',
    },
    {
      id: 'boxOffice',
      title: 'Box Office',
      icon: <HandCoinsIcon />,
      content: (
        <DataLink basePath="/" query={{ budget: film.boxOffice }}>
          {getFormattedMoneyValue(film.boxOffice)}
        </DataLink>
      ),
      isHidden: film.type === 'SERIES',
    },
    {
      id: 'seriesStats',
      title: 'Series Summary',
      icon: <TvIcon />,
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

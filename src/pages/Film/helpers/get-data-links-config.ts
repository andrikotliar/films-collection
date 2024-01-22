import { FilmData, LinkGroup } from '@/common';
import { seriesContent } from './series-content';

const getDataLinkConfig = (film: FilmData): LinkGroup[] => {
  const seriesData = seriesContent(film.series);

  return [
    ...(!film.series
      ? [
          {
            value: film.year,
            variant: 'ocean',
            property: 'year',
            title: 'Year',
          } as LinkGroup,
        ]
      : []),
    {
      value: film.genres,
      property: 'genres',
      variant: 'desert',
      title: 'Genres',
    },
    {
      value: film.duration,
      property: 'duration',
      variant: 'clouds',
      suffix: 'min',
      title: 'Runtime',
    },
    {
      value: film.countries,
      property: 'countries',
      variant: 'clouds',
      title: 'Countries',
    },
    ...seriesData,
    {
      value: film.collections.map((collection) => collection.title),
      property: 'collections',
      variant: 'mars',
      title: 'Collections',
    },
    {
      value: film.production,
      property: 'production',
      variant: 'clouds',
      title: 'Studios',
    },
  ];
};

export { getDataLinkConfig };

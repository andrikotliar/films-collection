import { FilmData, LinkGroup } from '@/common';
import { seriesContent } from './series-content';

const getDataLinkConfig = (film: FilmData): LinkGroup[] => {
  const seriesData = seriesContent(film.series);

  return [
    ...(!film.series
      ? [
          {
            value: film.year,
            property: 'year',
            title: 'Year',
          },
        ]
      : []),
    {
      value: film.genres,
      property: 'genres',
      title: 'Genres',
    },
    ...seriesData,
    {
      value: film.duration,
      property: 'duration',
      suffix: 'min',
      title: 'Runtime',
    },
    {
      value: film.countries,
      property: 'countries',
      title: 'Countries',
    },
    {
      value: film.production,
      property: 'production',
      title: 'Studios',
    },
    {
      value: film.collections.map((collection) => collection.title),
      property: 'collections',
      title: 'Collections',
    },
  ];
};

export { getDataLinkConfig };

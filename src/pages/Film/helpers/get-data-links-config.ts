import { FilmData, LinkGroup } from '@/common';
import { seriesContent } from './series-content';

const getDataLinkConfig = (film: FilmData): LinkGroup[] => {
  const seriesData = seriesContent(film.series);

  return [
    {
      value: film.year,
      property: 'year',
      title: 'Year',
    },
    {
      value: film.genres,
      property: 'genres',
      title: 'Genres',
    },
    {
      value: film.duration,
      property: 'duration',
      suffix: 'min',
      title: 'Runtime',
    },
    ...seriesData,
  ];
};

export { getDataLinkConfig };

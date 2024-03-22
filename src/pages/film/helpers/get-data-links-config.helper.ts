import { FilmData, LinkGroup } from '@/common/types';
import { seriesContent } from './series-content.helper';

const getDataLinkConfig = (film: FilmData): LinkGroup[] => {
  const seriesData = seriesContent(film.series);

  return [
    {
      value: film.year[0],
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

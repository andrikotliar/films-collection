import { FilmData, LinkGroup, SeriesExtension } from '@/common/types';

const getSeriesExtension = (series?: SeriesExtension): LinkGroup[] => {
  if (!series) return [];

  return [
    {
      value: series.seasons.length,
      property: 'seasons',
      title: 'Seasons count',
      suffix: `season${series.seasons.length > 1 && 's'}`,
    },
    {
      value: series.episodesTotal,
      property: 'episodes',
      title: 'All episodes count',
      suffix: `episode${series.episodesTotal > 1 && 's'}`,
    },
  ];
};

const getFilmSummaryConfig = (film: FilmData): LinkGroup[] => {
  const isSeries = film.type.includes('Series');
  const seriesExtension = getSeriesExtension(film.series);

  return [
    ...seriesExtension,
    {
      value: film.year[0],
      property: 'year',
      title: !isSeries ? 'Release Year' : 'First season year',
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
    {
      value: film.countries,
      property: 'countries',
      title: 'Origin countries',
    },
    {
      value: film.production,
      property: 'production',
      title: 'Production studios',
    },
    {
      value: film.collections.map((collection) => collection.title),
      property: 'collections',
      title: 'Collections',
    },
  ];
};

export { getFilmSummaryConfig };

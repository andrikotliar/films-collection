import { LinkGroup, SeriesExtension } from '@/common';

const seriesContent = (series?: SeriesExtension): LinkGroup[] => {
  if (!series) return [];

  return [
    {
      value: series.seasons.length,
      property: 'seasons',
      title: 'Seasons',
    },
    {
      value: series.episodesTotal,
      property: 'episodes',
      title: 'Episodes',
    },
  ];
};

export { seriesContent };

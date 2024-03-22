import { LinkGroup, SeriesExtension } from '@/common/types';

const seriesContent = (series?: SeriesExtension): LinkGroup[] => {
  if (!series) return [];

  return [
    {
      value: series.seasons.length,
      property: 'seasons',
      title: 'Seasons',
      suffix: `season${series.seasons.length > 1 && 's'}`,
    },
    {
      value: series.episodesTotal,
      property: 'episodes',
      title: 'Episodes',
      suffix: `episode${series.episodesTotal > 1 && 's'}`,
    },
  ];
};

export { seriesContent };

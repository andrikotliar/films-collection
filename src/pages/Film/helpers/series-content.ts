import { LinkGroup, SeriesExtension } from '@/common';

const seriesContent = (series?: SeriesExtension): LinkGroup[] => {
  if (!series) return [];

  return [
    {
      value: [
        `${series.seasons.length} seasons`,
        `${series.episodesTotal} episodes`,
      ],
      property: 'seasons',
      color: 'extra',
      title: 'Series stats',
    },
  ];
};

export { seriesContent };

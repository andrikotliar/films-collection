import { SeriesExtension } from '@/common';
import { DataLinkType } from '@/pages/Film/components/DataLinks/components';

const seriesContent = (series?: SeriesExtension): DataLinkType[] => {
  if (!series) return [];

  return [
    {
      value: series.seasons.length,
      property: 'seasons',
      suffix: 'seasons',
      color: 'extra',
    },
    {
      value: series.episodesTotal,
      property: 'episodes',
      suffix: 'eps',
      color: 'extra',
    },
  ];
};

export { seriesContent };

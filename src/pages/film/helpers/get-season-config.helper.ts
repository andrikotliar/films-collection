import { FilmData } from '@/common/types';

const getSeasonConfig = (film: FilmData, activeIndex: number) => {
  if (!film.series) {
    return [];
  }

  const season = film.series.seasons[activeIndex];

  return [
    {
      value: film.year[activeIndex],
      property: 'seasonYear',
      title: 'Release year',
    },
    {
      value: season.episodesCount,
      property: 'seasonEpisodesCount',
      title: 'Season episode count',
      suffix: `episode${season.episodesCount > 1 && 's'}`,
    },
  ];
};

export { getSeasonConfig };

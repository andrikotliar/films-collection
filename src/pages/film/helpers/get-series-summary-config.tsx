import { FilmData } from '@/common/types';
import { SummaryConfig } from '../types';
import { TagLink } from '../components/tag-link/TagLink';
import { SeriesTagLinkGroup } from '../components/series-tag-links-group/SeriesTagLinkGroup';

const getSeriesSummaryConfig = (
  film: FilmData,
  activeIndex: number,
): SummaryConfig[] => {
  if (!film.series) {
    return [];
  }

  const seasonsCount = film.series.seasons.length;
  const episodesCount = film.series.episodesTotal;
  const activeSeason = film.series.seasons[activeIndex];

  return [
    {
      id: 'seriesStats',
      title: 'General series stats',
      content: (
        <SeriesTagLinkGroup
          seasonsCount={seasonsCount}
          episodesCount={episodesCount}
        />
      ),
    },
    {
      id: 'activeSeasonEpisodes',
      title: 'Active season stats',
      content: (
        <TagLink path="#" isDisabled variant="gray">
          {activeSeason.episodesCount} episode
          {activeSeason.episodesCount > 1 ? 's' : ''}
        </TagLink>
      ),
    },
  ];
};

export { getSeriesSummaryConfig };

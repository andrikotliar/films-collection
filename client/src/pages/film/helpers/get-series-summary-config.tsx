import { FilmData } from '@/types';
import { SummaryConfig } from '../types';
import { TagLink } from '../components/tag-link/TagLink';
import { SeriesTagLinkGroup } from '../components/series-tag-links-group/SeriesTagLinkGroup';

const getSeriesSummaryConfig = (
  film: FilmData,
  activeIndex: number,
): SummaryConfig[] => {
  if (!film.seriesExtension) {
    return [];
  }

  const seasonsCount = film.seriesExtension.seasons.length;
  const episodesCount = film.seriesExtension.episodesTotal;
  const activeSeason = film.seriesExtension.seasons[activeIndex];

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

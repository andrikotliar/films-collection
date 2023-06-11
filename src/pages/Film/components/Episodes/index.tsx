import './styles.css';
import { FC, useState } from 'react';
import { Season } from '@/types';
import { ResizableButton } from '@/components';

const Episodes: FC<{ seasons: Season[] }> = ({ seasons }) => {
  const [activeSeason, setActiveSeason] = useState(0);
  const [expandedEpisode, setExpandedEpisode] = useState<string | null>(null);

  const defineActiveSeason = (season: number) => {
    setActiveSeason(season);
    if(expandedEpisode !== null) {
      setExpandedEpisode(null);
    };
  };

  return (
    <div className="series">
      <div className="seasons">
        {seasons.map((seasonData, seasonIndex) => (
          <ResizableButton
            key={seasonData.season}
            onClick={() => defineActiveSeason(seasonIndex)}
            isActive={seasonIndex === activeSeason}
            expandTitle="Season"
            smallTitle={seasonData.season}
          />
        ))}
      </div>
      <div className="episodes-table-wrapper">
        <table className="episodes-table">
          <thead className="episodes-table__header">
            <tr className="episodes-table__row">
              <th className="episodes-table__cell" colSpan={2}>Episode</th>
              <th className="episodes-table__cell">Title</th>
            </tr>
          </thead>
          <tbody className="episodes-table__body">
            {seasons[activeSeason].episodes.map((episode) => (
              <tr className="episodes-table__row" key={episode.episodeOverall}>
                <td className="episodes-table__cell episodes-table__cell--num">
                  {episode.episodeOverall}
                </td>
                <td className="episodes-table__cell episodes-table__cell--num">
                  {episode.episode}
                </td>
                <td className="episodes-table__cell">
                  {episode.title}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Episodes;
import './styles.css';
import { ChangeEvent, FC, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { buildLink } from '@/heplers';
import { ExpandIcon } from '@/assets/icons';
import { Season } from '@/types';

const Episodes: FC<{ seasons: Season[] }> = ({ seasons }) => {
  const [activeSeason, setActiveSeason] = useState(0);
  const [expandedEpisode, setExpandedEpisode] = useState<string | null>(null);

  const defineActiveSeason = (event: ChangeEvent<HTMLSelectElement>) => {
    setActiveSeason(Number(event.target.value));
    if(expandedEpisode !== null) {
      setExpandedEpisode(null);
    };
  };

  const expandEpisode = (
    episodeTitle: string,
    expandedEpisode: string | null
  ) => {
    if(episodeTitle === expandedEpisode) {
      setExpandedEpisode(null);
      return;
    }

    setExpandedEpisode(episodeTitle);
  }

  return (
    <div className="series">
      <div className="seasons">
        <span>Season:</span>
        <select
          className="seasons__select"
          onChange={defineActiveSeason}
          disabled={seasons.length === 1}
        >
          {seasons.map((seasonData, seasonIndex) => (
            <option key={seasonData.season} value={seasonIndex}>
              {seasonData.season}
            </option>
          ))}
        </select>
      </div>
      <div className="episodes">
        {seasons[activeSeason].episodes.map((episode) => (
          <div className="episode" key={episode.episodeOverall}>
            <div
              className="episode__main"
              onClick={() => expandEpisode(episode.title, expandedEpisode)}
              role="button"
            >
              <div className="episode__numbers">
                <span className="episode__numbers--overall">{episode.episodeOverall}</span>
                <span className="episode__numbers--internal">{episode.episode}</span>
              </div>
              <h4 className="episode__title">
                {episode.title}
              </h4>
              <div className={classNames('episode__expand', {
                'episode__expand--active': expandedEpisode === episode.title
              })}>
                <ExpandIcon />
              </div>
            </div>
            {expandedEpisode === episode.title && (
              <div className="episode__details">
                <div className="episode__creator">
                  <span>Directed by:</span>
                  <Link to={buildLink('directedBy', episode.directedBy)}>
                    {episode.directedBy}
                  </Link>
                </div>
                <div className="episode__creator">
                  <span>Written by:</span>
                  <div>{episode.writtenBy}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Episodes;
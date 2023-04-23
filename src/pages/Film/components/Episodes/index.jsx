import classNames from 'classnames';
import { useState } from 'react';
import './styles.css';

const Episodes = ({ seasons }) => {
  const [activeSeason, setActiveSeason] = useState(0);

  return (
    <div className="series">
      <div className="seasons">
        {seasons.map((seasonData, seasonIndex) => (
          <button
            className={classNames(
              'season-button',
              {
                'season-button--active': activeSeason === seasonIndex
              }
            )}
            onClick={() => setActiveSeason(seasonIndex)}
            key={seasonData.season}
          >
            Season {seasonData.season}
          </button>
        ))}
      </div>
      <div className="episodes">
        {seasons[activeSeason].episodes.map((episode) => (
          <div
            className="episode-data"
            key={episode.title}
          >
            <div className="episode-data__main">
              <span>
                {episode.episode} [ {episode.episodeOverall} ]
              </span>
              <h4 className="episode-data__title">{episode.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Episodes;
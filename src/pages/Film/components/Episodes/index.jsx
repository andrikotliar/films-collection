import classNames from 'classnames';
import { useState } from 'react';
import './styles.css';

const Episodes = ({ seasons }) => {
  const [activeSeason, setActiveSeason] = useState(0);

  return (
    <div className="series">
      <div className="seasons">
        <span>Season:</span>
        <select
          className="seasons__select"
          onChange={(event) => setActiveSeason(event.target.value)}
        >
          {seasons.map((seasonData, seasonIndex) => (
            <option key={seasonData.season} value={seasonIndex}>
              {seasonData.season}
            </option>
          ))}
        </select>
      </div>
      <div className="episodes-wrapper">
        <table className="episodes">
          <tbody>
            {seasons[activeSeason].episodes.map((episode) => (
              <tr
                className="episode-data"
                key={episode.title}
              >
                <td className="episode-data__number">
                  {episode.episodeOverall}
                </td>
                <td className="episode-data__main">
                  <h4 className="episode-data__title">
                    {episode.title}
                  </h4>
                  <div className="episode-data__creators">
                    <p>
                      Directed by: {episode.directedBy}
                    </p>
                    <p>
                      Directed by: {episode.writtenBy}
                    </p>
                  </div>
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
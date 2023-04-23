import classNames from 'classnames';
import { useState } from 'react';
import Trailer from '../Trailer';
import './styles.css'

const SeasonTrailers = ({ seasons }) => {
  const [ selectedSeason, setSelectedSeason ] = useState(0);

  return (
    <div className="season-trailers">
      {seasons.length > 1 && (
        <div className="season-trailers-header">
          {seasons.map((s, idx) => (
            <button
              className={
                classNames(
                  'season-trailers-button',
                  {
                    'season-trailers-button-active': selectedSeason === idx
                  }
                )
              }
              onClick={() => setSelectedSeason(idx)}
              key={s.trailer}
            >
              {s.season}
            </button>
          ))}
        </div>
      )}
      <div className="season-trailers-video">
        <Trailer trailer={seasons[selectedSeason].trailer} />
      </div>
    </div>
  );
};

export default SeasonTrailers;
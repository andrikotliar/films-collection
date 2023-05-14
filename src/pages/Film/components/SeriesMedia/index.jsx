import { useState } from 'react';
import FilmMedia from '../FilmMedia';
import './styles.css';
import classNames from 'classnames';
const SeriesMedia = ({ seasons, title, poster }) => {
  const [selectedSeason, setSelectedSeason] = useState(0);

  const getPoster = (selectedSeason) => {
    if(selectedSeason === 0) {
      return poster;
    } 
    return `${poster}_s${selectedSeason + 1}`;
  };

  return (
    <div className="series-media">
      <FilmMedia
        poster={getPoster(selectedSeason)}
        title={title}
        trailer={seasons[selectedSeason].trailer}
      />
      <div className="series-media__controls custom-scroll">
        {seasons.map((s, idx) => (
          <button
            key={s.season}
            onClick={() => setSelectedSeason(idx)}
            className={classNames({
              'active-season': idx === selectedSeason
            })}
          >
            Season {s.season}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SeriesMedia;
import './styles.css';
import { FC, useState } from 'react';
import classNames from 'classnames';
import FilmMedia from '../FilmMedia';
import { Season } from '@/types';

type SeriesMediaProps = {
  seasons: Season[];
  title: string;
  poster: string;
}

const SeriesMedia: FC<SeriesMediaProps> = ({ seasons, title, poster }) => {
  const [selectedSeason, setSelectedSeason] = useState(0);

  const getPoster = (selectedSeason: number) => {
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
            disabled={seasons.length === 1}
          >
            Season {s.season}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SeriesMedia;
import './styles.css';
import { FC, useState } from 'react';
import FilmMedia from '../FilmMedia';
import { Season } from '@/types';
import { ResizableButton } from '@/components';

type SeriesMediaProps = {
  seasons: Season[];
  title: string;
}

const SeriesMedia: FC<SeriesMediaProps> = ({ seasons, title }) => {
  const [selectedSeason, setSelectedSeason] = useState(0);

  return (
    <div className="series-media">
      <div className="series-media__controls custom-scroll">
        {seasons.map((s, idx) => (
          <ResizableButton
            key={s.season}
            onClick={() => setSelectedSeason(idx)}
            disabled={seasons.length === 1}
            isActive={idx === selectedSeason}
            smallTitle={s.season}
            expandTitle="Season"
          />
        ))}
      </div>
      <FilmMedia
        poster={seasons[selectedSeason].poster}
        title={title}
        trailer={seasons[selectedSeason].trailer}
      />
    </div>
  );
};

export default SeriesMedia;
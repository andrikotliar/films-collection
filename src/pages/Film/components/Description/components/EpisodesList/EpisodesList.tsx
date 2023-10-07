import './episodes.css';
import { FC } from 'react';
import { Episode } from '@/types';

const EpisodesList: FC<{ episodes: Episode[] }> = ({ episodes }) => {
  return (
    <div className="episodes-list">
      {episodes.map((episode) => (
        <div className="episodes-list-item" key={episode.episodeOverall}>
          <b>{episode.episodeOverall}.</b> <span>{episode.title}</span>
        </div>
      ))}
    </div>
  );
};

export { EpisodesList };
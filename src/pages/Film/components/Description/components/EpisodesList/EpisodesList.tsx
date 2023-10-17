import classes from './EpisodesList.module.css';
import { FC } from 'react';
import { Episode, PropsWithClassName } from '@/common';
import classNames from 'classnames';

type EpisodesListProps = {
  episodes: Episode[];
};

const EpisodesList: FC<
  PropsWithClassName<EpisodesListProps>
> = ({ episodes, className }) => {
  return (
    <div
      className={classNames(
        classes.episodesList,
        className,
      )}
    >
      {episodes.map(episode => (
        <div
          className={classes.episode}
          key={episode.episodeOverall}
        >
          <b>{episode.episodeOverall}.</b>{' '}
          <span>{episode.title}</span>
        </div>
      ))}
    </div>
  );
};

export { EpisodesList };

import { FC } from 'react';
import styles from './Video.module.css';
import classNames from 'classnames';

type VideoProps = {
  trailerId: string;
  autoPlay: number;
  isFullSize?: boolean;
};

export const Video: FC<VideoProps> = ({
  trailerId,
  autoPlay,
  isFullSize = false,
}) => {
  return (
    <div
      className={classNames(styles.video, {
        [styles.fullSizeVideo]: isFullSize,
      })}
    >
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${trailerId}?rel=0&showinfo=0&autoplay=${autoPlay}`}
        allow="autoplay"
        allowFullScreen
      />
    </div>
  );
};

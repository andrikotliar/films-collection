import { FC } from 'react';
import styles from './Video.module.css';

type VideoProps = {
  trailerId: string;
};

export const Video: FC<VideoProps> = ({ trailerId }) => {
  return (
    <div className={styles.video}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${trailerId}?rel=0&showinfo=0&autoplay=1`}
        allow="autoplay"
        allowFullScreen
      />
    </div>
  );
};

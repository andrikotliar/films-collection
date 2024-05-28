import { FC } from 'react';

import styles from './Video.module.css';

type VideoProps = {
  path: string;
};

const Video: FC<VideoProps> = ({ path }) => {
  return (
    <div className={styles.videoWrapper}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${path}?rel=0&showinfo=0&autoplay=1`}
        allow="autoplay"
        allowFullScreen
      />
    </div>
  );
};

export { Video };

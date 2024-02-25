import styles from './Video.module.css';
import { FC } from 'react';

type Props = {
  path: string;
};

const Video: FC<Props> = ({ path }) => {
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

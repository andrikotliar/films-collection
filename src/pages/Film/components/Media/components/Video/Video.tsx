import classes from './Video.module.css';
import { FC } from 'react';

type VideoProps = {
  path: string;
};

const Video: FC<VideoProps> = ({ path }) => {
  return (
    <div className={classes.videoWrapper}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${path}?rel=0&showinfo=0&autoplay=1`}
        allow="autoplay"
        allowFullScreen
      />
    </div>
  );
};

export { Video };

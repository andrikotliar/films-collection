import classes from './Trailer.module.css';
import { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PlayIcon } from '@/assets/icons';

const Trailer: FC<{ trailer: string }> = ({ trailer }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (showTrailer) {
      setShowTrailer(false);
    }
  }, [id]);

  return (
    <div
      className={classes.trailer}
      onClick={() => setShowTrailer(true)}
      aria-label="Show trailer"
    >
      <div className={classes.cover}>
        {!showTrailer ? (
          <>
            <img
              src={`https://i.ytimg.com/vi/${trailer}/hqdefault.jpg`}
              alt=""
            />
            <PlayIcon className={classes.playIcon} />
          </>
        ) : (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${trailer}?rel=0&showinfo=0&autoplay=1`}
            allow="autoplay"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
};

export { Trailer };

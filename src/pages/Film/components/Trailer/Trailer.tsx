import './trailer.css';
import { PlayIcon } from '@/assets/icons';
import { FC, useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Trailer: FC<{ trailer: string }> = ({ trailer }) => {
  const [ showTrailer, setShowTrailer ] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if(showTrailer) {
      setShowTrailer(false);
    }
  }, [id]);

  return (
    <div
      className="trailer"
      onClick={() => setShowTrailer(true)}
      aria-label="Show trailer"
    >
      <div className="trailer__cover">
        {!showTrailer ? (
          <>
            <img
              src={`https://i.ytimg.com/vi/${trailer}/hqdefault.jpg`}
              alt=""
            />
            <PlayIcon className="trailer__play-icon" />
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
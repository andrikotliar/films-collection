import './styles.css';
import { PlayIcon } from '@/assets/icons';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TrailerModal from '../TrailerModal';

const Trailer = ({ trailer }) => {
  const [ showTrailer, setShowTrailer ] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if(showTrailer) {
      setShowTrailer(false);
    }
  }, [id]);

  return (
    <>
      <button className="trailer" onClick={() => setShowTrailer(true)}>
        <img
          src={`https://i.ytimg.com/vi/${trailer}/hqdefault.jpg`}
          className="trailer__cover"
          alt=""
        />
        <div className="trailer__play-icon">
          <PlayIcon />
        </div>
      </button>
      <TrailerModal
        showTrailer={showTrailer}
        closeTrailerModal={() => setShowTrailer(false)}
        trailer={trailer}
      />
    </>
  );
};

export default Trailer;
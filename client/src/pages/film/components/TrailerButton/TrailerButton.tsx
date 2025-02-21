import { FC, useState } from 'react';
import { PlayIcon } from 'lucide-react';
import { TrailersModal } from './components';
import styles from './TrailerButton.module.css';

type TrailerButtonProps = {
  trailerId: string;
};

export const TrailerButton: FC<TrailerButtonProps> = ({ trailerId }) => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const handleCloseTrailer = () => {
    setIsTrailerOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsTrailerOpen(true)}
        className={styles.playButton}
        title="Play trailer"
      >
        <PlayIcon size={16} />
        <span>Play trailer</span>
      </button>
      <TrailersModal
        isOpen={isTrailerOpen}
        onClose={handleCloseTrailer}
        trailerId={trailerId}
      />
    </>
  );
};

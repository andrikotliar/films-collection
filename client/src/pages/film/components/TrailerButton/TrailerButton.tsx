import { FC, useState } from 'react';
import { PlayIcon } from 'lucide-react';
import { TrailersModal } from './components';
import styles from './TrailerButton.module.css';

type TrailerButtonProps = {
  trailers: string[];
  title?: string;
};

export const TrailerButton: FC<TrailerButtonProps> = ({ trailers }) => {
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
        <div className={styles.iconWrapper}>
          <PlayIcon size={18} className={styles.playIcon} />
        </div>
      </button>
      <TrailersModal
        isOpen={isTrailerOpen}
        onClose={handleCloseTrailer}
        trailers={trailers}
      />
    </>
  );
};

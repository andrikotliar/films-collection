import { Season } from '@/types';
import { FC, useState } from 'react';
import { TrailersModal } from './components';
import styles from './Trailers.module.css';
import { PlayIcon } from 'lucide-react';

type TrailersProps = {
  trailerId: string | null;
  seasons?: Season[];
};

export const Trailers: FC<TrailersProps> = ({ trailerId, seasons }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!trailerId && !seasons?.length) {
    return null;
  }

  return (
    <div className={styles.trailers}>
      <button
        className={styles.playButton}
        title="Play trailer"
        onClick={() => setIsModalOpen(true)}
      >
        <PlayIcon className={styles.playIcon} />
        <span className={styles.label}>Play trailer</span>
      </button>
      <TrailersModal
        isOpen={isModalOpen}
        trailerId={trailerId}
        seasons={seasons ?? []}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

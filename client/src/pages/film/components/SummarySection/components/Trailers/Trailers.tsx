import { Film, FilmTrailer } from '@/types';
import { FC, useState } from 'react';
import { TrailersModal } from './components';
import styles from './Trailers.module.css';
import { PlayIcon } from 'lucide-react';

type TrailersProps = {
  data: FilmTrailer[];
  type: Film['type'];
};

export const Trailers: FC<TrailersProps> = ({ data, type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!data.length) {
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
        <span className={styles.label}>
          Play trailer{data.length > 1 && 's'}
        </span>
      </button>
      <TrailersModal
        isOpen={isModalOpen}
        trailers={data}
        onClose={() => setIsModalOpen(false)}
        type={type}
      />
    </div>
  );
};

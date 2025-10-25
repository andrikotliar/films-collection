import styles from './styles.module.css';
import { Modal, type Film, type FilmTrailer } from '~/common';
import { useState } from 'react';
import { PlayIcon } from 'lucide-react';
import { TrailersPlaylist } from '~/routes/films/-components/summary-section/components/trailers/components';

type Props = {
  data: FilmTrailer[];
  type: Film['type'];
};

export const Trailers = ({ data, type }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!data.length) {
    return null;
  }

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const previewLabel = type === 'SERIES' ? 'Season' : 'Trailer #';

  return (
    <div className={styles.trailers}>
      <button
        className={styles.play_button}
        title="Play trailer"
        onClick={() => setIsModalOpen(true)}
      >
        <PlayIcon className={styles.play_icon} />
        <span className={styles.label}>Play trailer{data.length > 1 && 's'}</span>
      </button>
      <Modal isOpen={isModalOpen} onClose={handleClose} className={styles.trailers_modal}>
        <Modal.Content className={styles.trailers_modal_content}>
          <TrailersPlaylist trailers={data} previewLabel={previewLabel} />
          <Modal.CloseButton onClick={handleClose} className={styles.trailer_close_button} />
          <Modal.CloseButton onClick={handleClose} className={styles.trailer_close_button} />
        </Modal.Content>
      </Modal>
    </div>
  );
};

import styles from './trailers-button.module.css';
import { Modal, type Film, type FilmTrailer } from '~/shared';
import { useState } from 'react';
import { PlayIcon } from 'lucide-react';
import { TrailersPlaylist } from '~/routes/films/$id/-components/summary-section/components/trailers-button/components';

type TrailersButtonProps = {
  data: FilmTrailer[];
  type: Film['type'];
};

export const TrailersButton = ({ data, type }: TrailersButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!data.length) {
    return null;
  }

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const previewLabel = type === 'SERIES' ? 'Season' : 'Trailer #';

  return (
    <>
      <button
        className={styles.play_button}
        title="Play trailer"
        onClick={() => setIsModalOpen(true)}
      >
        <PlayIcon className={styles.play_icon} />
        <span>Play Trailer{data.length > 1 && 's'}</span>
      </button>
      <Modal isOpen={isModalOpen} onClose={handleClose} className={styles.trailers_modal}>
        <Modal.Content className={styles.trailers_modal_content}>
          <TrailersPlaylist trailers={data} previewLabel={previewLabel} />
          <Modal.CloseButton onClick={handleClose} className={styles.trailer_close_button} />
          <Modal.CloseButton onClick={handleClose} className={styles.trailer_close_button} />
        </Modal.Content>
      </Modal>
    </>
  );
};

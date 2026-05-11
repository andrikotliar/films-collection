import styles from './trailers-button.module.css';
import { Modal, type api, type ApiResponse } from '~/shared';
import { useState } from 'react';
import { PlayIcon } from 'lucide-react';
import { TrailersPlaylist } from '~/routes/films/$id/-components/summary-section/components/trailers-button/components';
import type { Enum, TitleType } from '@films-collection/shared';

type TrailersButtonProps = {
  data: ApiResponse<typeof api.films.getById.exec>['trailers'];
  type: Enum<typeof TitleType>;
};

export const TrailersButton = ({ data, type }: TrailersButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <span className={styles.play_button_label}>Trailer{data.length > 1 && 's'}</span>
      </button>
      <Modal isOpen={isModalOpen} onClose={handleClose}>
        <Modal.Content>
          <TrailersPlaylist trailers={data} previewLabel={previewLabel} />
          <Modal.CloseButton onClick={handleClose} />
        </Modal.Content>
      </Modal>
    </>
  );
};

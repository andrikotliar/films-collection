import { Modal, ScrollableWrapper } from '@/components';
import { FC, useState } from 'react';
import { Video } from '../Video/Video';
import styles from './TrailersModal.module.css';
import { PreviewButton } from '../PreviewButton/PreviewButton';
import classNames from 'classnames';

type TrailersModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  trailers: string[];
};

export const TrailersModal: FC<TrailersModalProps> = ({
  isOpen,
  onClose,
  trailers,
}) => {
  const [selectedTrailerIndex, setSelectedTrailerIndex] = useState(0);
  const [autoPlayMode, setAutoPlayMode] = useState(() => {
    return trailers.length > 1 ? 0 : 1;
  });

  const handleSelectTrailer = (index: number) => {
    setSelectedTrailerIndex(index);
    if (autoPlayMode === 0) {
      setAutoPlayMode(1);
    }
  };

  const handleClose = () => {
    setSelectedTrailerIndex(0);

    if (trailers.length > 1) {
      setAutoPlayMode(0);
    }

    onClose();
  };

  const isMultiple = trailers.length > 1;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className={styles.trailersModal}
    >
      <Modal.Content
        className={classNames(styles.trailersModalContent, {
          [styles.multipleTrailers]: isMultiple,
        })}
      >
        <div className={styles.innerContentWrapper}>
          <Video
            trailerId={trailers[selectedTrailerIndex]}
            autoPlay={autoPlayMode}
            isFullSize={!isMultiple}
          />
          {isMultiple && (
            <ScrollableWrapper className={styles.trailersTrack}>
              {trailers.map((trailer, index) => (
                <PreviewButton
                  onClick={() => handleSelectTrailer(index)}
                  trailer={trailer}
                  key={trailer}
                  isActive={index === selectedTrailerIndex}
                >
                  Season {index + 1}
                </PreviewButton>
              ))}
            </ScrollableWrapper>
          )}
        </div>
        <Modal.CloseButton
          onClick={handleClose}
          className={styles.trailerCloseButton}
        />
      </Modal.Content>
    </Modal>
  );
};

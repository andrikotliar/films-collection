import { Modal } from '@/components';
import { FC, PropsWithChildren, ReactNode, useState } from 'react';
import styles from './TrailerButton.module.css';
import { PropsWithClassName } from '@/types';
import classNames from 'classnames';

type TrailerButtonProps = PropsWithClassName<{
  trailer: string;
  icon: ReactNode;
  title?: string;
}>;

const TrailerButton: FC<PropsWithChildren<TrailerButtonProps>> = ({
  trailer,
  icon,
  children,
  className,
}) => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const handleCloseTrailer = () => {
    setIsTrailerOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsTrailerOpen(true)}
        className={classNames(styles.playButton, className)}
        title="Play trailer"
      >
        <div className={styles.icon}>{icon}</div>
        {children}
      </button>
      <Modal
        isOpen={isTrailerOpen}
        onClose={handleCloseTrailer}
        className={styles.trailerModal}
      >
        <Modal.Content className={styles.trailerModalContent}>
          <div className={styles.videoWrapper}>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${trailer}?rel=0&showinfo=0&autoplay=1`}
              allow="autoplay"
              allowFullScreen
            />
          </div>
          <Modal.CloseButton
            onClick={handleCloseTrailer}
            className={styles.trailerCloseButton}
          />
        </Modal.Content>
      </Modal>
    </>
  );
};

export { TrailerButton };

import classNames from 'classnames';
import { FC, useState } from 'react';
import { PlayIcon } from 'lucide-react';
import { Modal } from '@/components';
import styles from './TrailerButton.module.css';

type TrailerButtonProps = {
  trailer: string;
  className?: string;
};

const TrailerButton: FC<TrailerButtonProps> = ({ className, trailer }) => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsTrailerOpen(true)}
        className={classNames(styles.playButton, className)}
      >
        <PlayIcon className={styles.playButtonIcon} />
        <span>Play trailer</span>
      </button>
      <Modal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        contentClassName={styles.trailer}
      >
        <div className={styles.videoWrapper}>
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${trailer}?rel=0&showinfo=0&autoplay=1`}
            allow="autoplay"
            allowFullScreen
          />
        </div>
      </Modal>
    </>
  );
};

export { TrailerButton };

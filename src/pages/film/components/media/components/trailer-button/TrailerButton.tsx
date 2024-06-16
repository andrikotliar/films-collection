import classNames from 'classnames';
import { FC, useState } from 'react';
import { Modal } from '@/components';
import { Video } from './components';

import styles from './TrailerButton.module.css';
import { PlayIcon } from 'lucide-react';

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
        <Video path={trailer} />
      </Modal>
    </>
  );
};

export { TrailerButton };

import classNames from 'classnames';
import { FC, useState } from 'react';
import { Modal } from '@/components';
import { Video } from './components';
import { Play } from 'lucide-react';

import styles from './TrailerButton.module.css';

type Props = {
  trailer: string;
  className?: string;
};

const TrailerButton: FC<Props> = ({ className, trailer }) => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsTrailerOpen(true)}
        className={classNames(styles.playButton, className)}
      >
        <Play className={styles.playButtonIcon} color="#006db7" />
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

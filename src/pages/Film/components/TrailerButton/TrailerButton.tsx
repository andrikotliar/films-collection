import classNames from 'classnames';
import { FC, useState } from 'react';
import classes from './TrailerButton.module.css';
import { Modal } from '@/components';
import { Video } from './components';
import { Play } from 'lucide-react';

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
        className={classNames(classes.playButton, className)}
      >
        <Play className={classes.playButtonIcon} color="#006db7" />
        <span>Play trailer</span>
      </button>
      <Modal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        contentClassName={classes.trailer}
      >
        <Video path={trailer} />
      </Modal>
    </>
  );
};

export { TrailerButton };

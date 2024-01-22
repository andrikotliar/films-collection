import classNames from 'classnames';
import { FC, useState } from 'react';
import classes from './TrailerButton.module.css';
import { PlayIconOutline } from '@/assets/icons';
import { Modal } from '@/components';
import { Video } from './components';

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
        <PlayIconOutline className={classes.playButtonIcon} color="#006db7" />
        <span>Play trailer</span>
      </button>
      <Modal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        contentClassName={classes.video}
      >
        {<Video path={trailer} />}
      </Modal>
    </>
  );
};

export { TrailerButton };

import { ExpandIcon } from '@/assets/icons';
import classes from './Controls.module.css';
import { Dispatch, FC, SetStateAction } from 'react';
import classNames from 'classnames';
import { MediaItem } from '@/common';

type ControlsProps = {
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  media: MediaItem[];
};

const Controls: FC<ControlsProps> = ({
  activeIndex,
  setActiveIndex,
  media,
}) => {
  const handlePrev = () => {
    setActiveIndex((index) => {
      if (index === 0) {
        return media.length - 1;
      }

      return index - 1;
    });
  };

  const handleNext = () => {
    setActiveIndex((index) => {
      if (index === media.length - 1) {
        return 0;
      }

      return index + 1;
    });
  };

  return (
    <div className={classes.controls}>
      <button onClick={handlePrev} className={classes.slideControl}>
        <ExpandIcon className={classNames(classes.arrow, classes.arrowLeft)} />
      </button>
      <span className={classes.caption}>{media[activeIndex].caption}</span>
      <button onClick={handleNext} className={classes.slideControl}>
        <ExpandIcon className={classNames(classes.arrow, classes.arrowRight)} />
      </button>
    </div>
  );
};

export { Controls };

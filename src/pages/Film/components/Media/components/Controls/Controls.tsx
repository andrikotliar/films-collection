import { ExpandIcon } from '@/assets/icons';
import classes from './Controls.module.css';
import { Dispatch, FC, SetStateAction } from 'react';
import classNames from 'classnames';

type ControlsProps = {
  itemsCount: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
};

const Controls: FC<ControlsProps> = ({ itemsCount, setActiveIndex }) => {
  const handlePrev = () => {
    setActiveIndex((index) => {
      if (index === 0) {
        return itemsCount - 1;
      }

      return index - 1;
    });
  };

  const handleNext = () => {
    setActiveIndex((index) => {
      if (index === itemsCount - 1) {
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
      <button onClick={handleNext} className={classes.slideControl}>
        <ExpandIcon className={classNames(classes.arrow, classes.arrowRight)} />
      </button>
    </div>
  );
};

export { Controls };

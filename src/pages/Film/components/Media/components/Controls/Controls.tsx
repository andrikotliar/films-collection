import styles from './Controls.module.css';
import { Dispatch, FC, SetStateAction } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
    <div className={styles.controls}>
      <button onClick={handlePrev} className={styles.slideControl}>
        <ChevronLeft color="#fff" className={styles.arrow} />
      </button>
      <button onClick={handleNext} className={styles.slideControl}>
        <ChevronRight color="#fff" className={styles.arrow} />
      </button>
    </div>
  );
};

export { Controls };

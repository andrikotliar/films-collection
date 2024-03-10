import { SeasonType } from '@/common';
import { Dispatch, FC, SetStateAction } from 'react';

import styles from './SeriesHeader.module.css';
import classNames from 'classnames';

type Props = {
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  seasons?: SeasonType[];
};

const SeriesHeader: FC<Props> = ({ activeIndex, setActiveIndex, seasons }) => {
  if (!seasons) {
    return null;
  }

  const handleSeasonChange = (index: number) => () => {
    setActiveIndex(index);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.title}>Season</div>
        <div className={styles.seasons}>
          {seasons.map((season, index) => (
            <button
              className={classNames(styles.button, {
                [styles.activeButton]: activeIndex === index,
              })}
              key={season.number}
              onClick={handleSeasonChange(index)}
            >
              {season.number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export { SeriesHeader };

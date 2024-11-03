import { ChangeEventHandler, FC, useState } from 'react';
import { SeasonType } from '@/types';
import styles from './SeasonsRow.module.css';
import { getFormattedDate } from '@/helpers';

type SeasonRowProps = {
  seasons: SeasonType[];
};

const SeasonsRow: FC<SeasonRowProps> = ({ seasons }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelectSeason: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setActiveIndex(Number(event.target.value));
  };

  return (
    <div className={styles.seasonsRow}>
      <select
        onChange={handleSelectSeason}
        className={styles.seasonSelect}
        disabled={seasons.length === 1}
      >
        {seasons.map((season, index) => (
          <option value={index} key={season.number}>
            Season {season.number}
          </option>
        ))}
      </select>
      <div className={styles.dataRow}>
        <span className={styles.dataRowLabel}>Episodes:</span>
        <span>{seasons[activeIndex].episodesCount}</span>
      </div>
      <div className={styles.dataRow}>
        <span className={styles.dataRowLabel}>Started At:</span>
        <span>{getFormattedDate(seasons[activeIndex].releaseDate)}</span>
      </div>
    </div>
  );
};

export { SeasonsRow };

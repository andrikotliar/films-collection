import { ChangeEventHandler, FC, useState } from 'react';
import { Season } from '@/types';
import styles from './SeasonsRow.module.css';
import { getFormattedDate } from '@/helpers';
import { ChevronDownIcon } from 'lucide-react';

type SeasonRowProps = {
  seasons: Season[];
};

export const SeasonsRow: FC<SeasonRowProps> = ({ seasons }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelectSeason: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setActiveIndex(Number(event.target.value));
  };

  return (
    <div className={styles.seasonsRow}>
      <div className={styles.seasonSelectWrapper}>
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
        <ChevronDownIcon className={styles.chevronDownIcon} size={18} />
      </div>
      <div className={styles.dataRow}>
        {seasons[activeIndex].episodesCount} episodes
      </div>
      <div className={styles.dataRow}>
        <span className={styles.dataRowLabel}>Started At:</span>
        {getFormattedDate(seasons[activeIndex].releaseDate)}
      </div>
    </div>
  );
};

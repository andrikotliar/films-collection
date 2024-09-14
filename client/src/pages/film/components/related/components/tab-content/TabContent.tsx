import { FC } from 'react';
import { RelatedItem } from '@/types';
import { FilmLink } from './components';

import styles from './TabContent.module.css';

type SectionProps = {
  data: RelatedItem[];
  currentFilmId: string;
  isNumerationShown?: boolean;
};

const TabContent: FC<SectionProps> = ({
  data,
  currentFilmId,
  isNumerationShown = false,
}) => {
  return (
    <div className={styles.grid}>
      {data.map((film, index) => (
        <FilmLink
          key={film.id}
          chapter={isNumerationShown ? index + 1 : null}
          isActive={film.id === currentFilmId}
          {...film}
        />
      ))}
    </div>
  );
};

export { TabContent };

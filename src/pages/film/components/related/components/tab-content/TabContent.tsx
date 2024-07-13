import { FC } from 'react';
import { RelatedItem } from '@/common/types';
import { FilmLink } from './components';

import styles from './TabContent.module.css';

type ExtendedRelatedItem = RelatedItem & {
  chapter?: number;
};

type SectionProps = {
  data: ExtendedRelatedItem[];
};

const TabContent: FC<SectionProps> = ({ data }) => {
  return (
    <div className={styles.grid}>
      {data.map((film) => (
        <FilmLink key={film.id} {...film} />
      ))}
    </div>
  );
};

export { TabContent };

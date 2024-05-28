import { FC } from 'react';
import { RelatedItem } from '@/common/types';
import { FilmLink } from './components';

import styles from './Section.module.css';

type ExtendedRelatedItem = RelatedItem & {
  chapter?: number;
};

type SectionProps = {
  title: string;
  data?: ExtendedRelatedItem[];
};

const Section: FC<SectionProps> = ({ title, data }) => {
  if (!data?.length) {
    return null;
  }

  return (
    <div className={styles.section}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.grid}>
        {data.map((film) => (
          <FilmLink key={film.id} {...film} />
        ))}
      </div>
    </div>
  );
};

export { Section };

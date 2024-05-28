import { FC } from 'react';
import { Section } from '@/pages/film/components/related/components';
import { useRelated } from '@/pages/film/components/related/hooks';
import { RelatedFilms } from '@/common/types';
import styles from './Related.module.css';

type RelatedFilmsProps = {
  data: RelatedFilms;
  filmId: string;
};

const Related: FC<RelatedFilmsProps> = ({ data, filmId }) => {
  const relatedFilms = useRelated(data, filmId);

  return (
    <div className={styles.wrapper}>
      <Section title="Previous chapters" data={relatedFilms.chapters.left} />
      <Section title="Next chapters" data={relatedFilms.chapters.right} />
      <Section title="Remakes" data={relatedFilms.remakes} />
      <Section title="Remake of" data={relatedFilms.originals} />
    </div>
  );
};

export { Related };

import { Section } from '@/pages/film/components/related/components';
import { useRelated } from '@/pages/film/components/related/hooks';
import { FC } from 'react';

import styles from './Related.module.css';

type Props = {
  relatedKey: string;
  filmId: string;
};

const Related: FC<Props> = ({ relatedKey, filmId }) => {
  const data = useRelated(relatedKey, filmId);

  if (!data) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <Section title="Previous chapters" data={data.chapters?.left} />
      <Section title="Next chapters" data={data.chapters?.right} />
      <Section title="Remakes" data={data.remakes} />
      <Section title="Remake of" data={data.originals} />
    </div>
  );
};

export { Related };

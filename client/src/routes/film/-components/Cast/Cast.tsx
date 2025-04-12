import { FC } from 'react';
import { FilmCast } from '@/types';
import { Actor } from './components';
import styles from './Cast.module.css';
import { ScrollableWrapper } from '@/ui';

type CastProps = {
  cast: FilmCast[];
};

export const Cast: FC<CastProps> = ({ cast }) => {
  return (
    <ScrollableWrapper className={styles.cast}>
      {cast.map((castItem) => (
        <Actor data={castItem} key={castItem.person.id} />
      ))}
    </ScrollableWrapper>
  );
};

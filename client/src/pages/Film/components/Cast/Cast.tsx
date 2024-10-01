import { FC } from 'react';
import { CastType } from '@/types';
import { Actor } from './components';
import styles from './Cast.module.css';
import { ScrollableWrapper } from '@/components';

type CastProps = {
  cast: CastType[];
};

const Cast: FC<CastProps> = ({ cast }) => {
  return (
    <ScrollableWrapper className={styles.actors}>
      {cast.map((person) => {
        return <Actor person={person} key={person.actor._id} />;
      })}
    </ScrollableWrapper>
  );
};

export { Cast };

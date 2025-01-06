import { FC } from 'react';
import { CastType } from '@/types';
import { Actor } from './components';
import styles from './Cast.module.css';

type CastProps = {
  cast: CastType[];
};

export const Cast: FC<CastProps> = ({ cast }) => {
  return (
    <div className={styles.actors}>
      {cast.map((person) => {
        return <Actor person={person} key={person.actor._id} />;
      })}
    </div>
  );
};

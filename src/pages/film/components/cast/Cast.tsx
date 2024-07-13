import { FC, useContext } from 'react';
import { CastType } from '@/common/types';
import { Actor } from './components';
import { FilmsContext } from '@/context';
import styles from './Cast.module.css';
import { Scrollable } from '@/components';

type CastProps = {
  cast: CastType[];
};

const Cast: FC<CastProps> = ({ cast }) => {
  const { actors } = useContext(FilmsContext);

  if (!actors) {
    return null;
  }

  return (
    <div className={styles.actors}>
      {cast.map((actor) => {
        const actorExternalData = actors[actor.actorId];

        return (
          <Actor
            actor={actor}
            externalData={actorExternalData}
            key={actor.actorId}
          />
        );
      })}
    </div>
  );
};

export { Cast };

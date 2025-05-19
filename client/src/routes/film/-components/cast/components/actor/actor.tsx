import { FC } from 'react';
import { Link } from '@tanstack/react-router';
import { FilmCast } from '@/types';
import styles from './actor.module.css';
import { Image } from '@/components';

type ActorProps = {
  data: FilmCast;
};

export const Actor: FC<ActorProps> = ({ data }) => {
  return (
    <Link
      className={styles.actor}
      to="/"
      search={{ actorId: data.person.id.toString() }}
      key={data.person.id}
    >
      <div className={styles.imageWrapper}>
        <Image
          src={data.person.image}
          alt={data.person.name}
          isExternal
          className={styles.image}
        />
      </div>

      <div className={styles.name}>{data.person.name}</div>
      <p className={styles.role}>{data.characterName}</p>
    </Link>
  );
};

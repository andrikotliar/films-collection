import { Link } from '@tanstack/react-router';
import { FilmPersonData } from '@/types';
import styles from './actor.module.css';
import { Image } from '@/components';

type ActorProps = {
  data: FilmPersonData;
};

export const Actor = ({ data }: ActorProps) => {
  return (
    <Link
      className={styles.actor}
      to="/"
      search={{ actorId: data.id.toString() }}
      key={data.id}
    >
      <div className={styles.imageWrapper}>
        <Image
          src={data.image}
          alt={data.name}
          isExternal
          className={styles.image}
        />
      </div>

      <div className={styles.name}>{data.name}</div>
      <p className={styles.role}>{data.details}</p>
    </Link>
  );
};

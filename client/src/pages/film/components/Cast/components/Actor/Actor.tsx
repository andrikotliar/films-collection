import { FC } from 'react';
import { Link } from '@tanstack/react-router';
import { FilmCast } from '@/types';
import { images } from '@/assets/images';
import styles from './Actor.module.css';
import { Image } from '@/ui';

type ActorProps = {
  data: FilmCast;
};

export const Actor: FC<ActorProps> = ({ data }) => {
  return (
    <Link
      to="/"
      search={{ actorId: data.person.id.toString() }}
      className={styles.actor}
      key={data.person.id}
    >
      <div className={styles.profile}>
        <div className={styles.imageWrapper}>
          <Image src={data.person.image} alt={data.person.name} isExternal />
        </div>
        <div className={styles.info}>
          <h3 className={styles.name}>{data.person.name}</h3>
          <p className={styles.role}>{data.characterName}</p>
        </div>
      </div>
      {data.characterImage && (
        <div className={styles.imageWrapper}>
          <Image
            src={data.characterImage}
            alt={data.characterName}
            errorImageSrc={images.characterNotFound}
            isExternal
          />
        </div>
      )}
    </Link>
  );
};

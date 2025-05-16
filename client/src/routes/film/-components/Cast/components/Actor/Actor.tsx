import { FC, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { FilmCast } from '@/types';
import { images } from '@/assets/images';
import styles from './Actor.module.css';
import { Image } from '@/components';
import classNames from 'classnames';
import { SendToBackIcon } from 'lucide-react';

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

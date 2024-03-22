import { FC } from 'react';
import { Link } from 'react-router-dom';
import { CastType } from '@/common/types';
import { buildLink } from '@/helpers';
import { Character, Profile } from './components';

import styles from './Actor.module.css';

type Props = {
  actor: CastType;
};

const Actor: FC<Props> = ({ actor }) => {
  return (
    <Link
      to={`${buildLink(
        'actor',
        JSON.stringify({ id: actor.actorId, name: actor.name }),
      )}`}
      className={styles.actor}
    >
      <Profile actor={actor} />
      {actor.character.imageUrl?.length !== 0 && (
        <Character character={actor.character} key={actor.character.imageUrl} />
      )}
    </Link>
  );
};

export { Actor };

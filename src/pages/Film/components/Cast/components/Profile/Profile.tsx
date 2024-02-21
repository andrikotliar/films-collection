import { CastType, IMAGE_FALLBACKS } from '@/common';
import styles from './Profile.module.css';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { buildLink, buildMediaPath } from '@/helpers';
import { handleImageError } from '@/utils';

type ProfileProps = {
  actor: CastType;
};

const Profile: FC<ProfileProps> = ({ actor }) => {
  const photoUrl = buildMediaPath('actors', actor.photoUrl);

  return (
    <div className={styles.profile}>
      <div className={styles.photo}>
        <img
          src={photoUrl}
          alt={actor.name}
          onError={(e) => handleImageError(e, IMAGE_FALLBACKS.noActorImage)}
        />
      </div>
      <div>
        <h3 className={styles.name}>
          <Link
            to={`${buildLink(
              'actor',
              JSON.stringify({ id: actor.actorId, name: actor.name }),
            )}`}
          >
            {actor.name}
          </Link>
        </h3>
        <p>{actor.character.name}</p>
      </div>
    </div>
  );
};

export { Profile };

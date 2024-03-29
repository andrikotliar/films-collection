import styles from './Profile.module.css';
import { FC } from 'react';
import { buildMediaPath } from '@/helpers';
import { handleImageError } from '@/utils';
import { CastType } from '@/common/types';
import { IMAGE_FALLBACKS } from '@/common/constants';

type Props = {
  actor: CastType;
};

const Profile: FC<Props> = ({ actor }) => {
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
      <div className={styles.details}>
        <h3 className={styles.name}>{actor.name}</h3>
        <p>{actor.character.name}</p>
      </div>
    </div>
  );
};

export { Profile };

import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Actor as ActorType, CastType } from '@/common/types';
import { buildMediaPath, buildQueryLink, handleImageError } from '@/helpers';
import { images } from '@/common/maps';
import styles from './Actor.module.css';

type ActorProps = {
  actor: CastType;
  externalData: ActorType;
};

const Actor: FC<ActorProps> = ({ actor, externalData }) => {
  const photoUrl = buildMediaPath('actors', externalData.photoUrl);
  const actorLink = buildQueryLink('cast', actor.actorId);

  return (
    <div className={styles.actor}>
      <Link to={actorLink} className={styles.photo}>
        <img
          src={photoUrl}
          alt={externalData.name}
          onError={handleImageError(images.actorNotFound)}
        />
      </Link>
      <div className={styles.details}>
        <Link to={actorLink} className={styles.name}>
          {externalData.name}
        </Link>
        <p className={styles.characterName}>{actor.character.name}</p>
      </div>
    </div>
  );
};

export { Actor };

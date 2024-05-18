import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Actor as ActorType, CastType } from '@/common/types';
import { buildMediaPath, buildQueryLink, handleImageError } from '@/helpers';
import { Character } from './components';
import { images } from '@/common/maps';
import styles from './Actor.module.css';

type ActorProps = {
  actor: CastType;
  externalData: ActorType;
};

const Actor: FC<ActorProps> = ({ actor, externalData }) => {
  const photoUrl = buildMediaPath('actors', externalData.photoUrl);

  return (
    <Link to={buildQueryLink('cast', actor.actorId)} className={styles.actor}>
      <div className={styles.profile}>
        <div className={styles.photo}>
          <img
            src={photoUrl}
            alt={externalData.name}
            onError={handleImageError(images.actorNotFound)}
          />
        </div>
        <div className={styles.details}>
          <h3 className={styles.name}>{externalData.name}</h3>
          <p>{actor.character.name}</p>
        </div>
      </div>
      {actor.character.imageUrl?.length !== 0 && (
        <Character character={actor.character} key={actor.character.imageUrl} />
      )}
    </Link>
  );
};

export { Actor };

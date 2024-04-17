import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Actor as ActorType, CastType } from '@/common/types';
import { buildMediaPath, buildRouterLink, handleImageError } from '@/helpers';
import { Character } from './components';
import { IMAGE_FALLBACKS } from '@/common/constants';
import styles from './Actor.module.css';
import { PersonRole } from '@/common/enums';

type Props = {
  actor: CastType;
  externalData: ActorType;
};

const Actor: FC<Props> = ({ actor, externalData }) => {
  const photoUrl = buildMediaPath('actors', externalData.photoUrl);

  return (
    <Link
      to={buildRouterLink('person', PersonRole.ACTOR, actor.actorId)}
      className={styles.actor}
    >
      <div className={styles.profile}>
        <div className={styles.photo}>
          <img
            src={photoUrl}
            alt={externalData.name}
            onError={(e) => handleImageError(e, IMAGE_FALLBACKS.noActorImage)}
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

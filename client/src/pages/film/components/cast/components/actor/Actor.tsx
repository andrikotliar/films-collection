import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { ImagesIcon } from 'lucide-react';
import classNames from 'classnames';
import { Actor as ActorType, CastType } from '@/types';
import { buildMediaPath, buildQueryLink, handleImageError } from '@/helpers';
import { images } from '@/assets/images';
import styles from './Actor.module.css';

type ActorProps = {
  actor: CastType;
  externalData: ActorType;
};

const Actor: FC<ActorProps> = ({ actor, externalData }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const photoUrl = buildMediaPath('actors', externalData.photoUrl);
  const actorLink = buildQueryLink({ cast: actor.actorId });

  const flipImage = () => {
    setIsFlipped((isFlipped) => !isFlipped);
  };

  return (
    <div className={styles.actor} key={actor.actorId}>
      <div
        className={classNames(styles.container, {
          [styles.flippable]: Boolean(actor.character.imageUrl),
        })}
        onClick={actor.character.imageUrl ? flipImage : undefined}
      >
        <div
          className={classNames(styles.card, {
            [styles.flipped]: isFlipped,
          })}
        >
          <img
            src={photoUrl}
            alt={externalData.name}
            onError={handleImageError(images.actorNotFound)}
            className={styles.image}
          />
          {actor.character.imageUrl && (
            <img
              src={buildMediaPath('characters', actor.character.imageUrl)}
              alt={actor.character.name}
              onError={handleImageError(images.characterNotFound)}
              className={classNames(styles.image, styles.characterSide)}
            />
          )}
        </div>
        {actor.character.imageUrl && (
          <div className={styles.imagesIconContainer}>
            <ImagesIcon className={styles.imagesIcon} />
          </div>
        )}
      </div>
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

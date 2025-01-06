import { FC, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ImagesIcon } from 'lucide-react';
import classNames from 'classnames';
import { CastType } from '@/types';
import { buildMediaPath, handleImageError } from '@/helpers';
import { images } from '@/assets/images';
import styles from './Actor.module.css';

type ActorProps = {
  person: CastType;
};

export const Actor: FC<ActorProps> = ({ person }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipImage = () => {
    setIsFlipped((isFlipped) => !isFlipped);
  };

  return (
    <div className={styles.actor} key={person.actor._id}>
      <div
        className={classNames(styles.container, {
          [styles.flippable]: Boolean(person.character.image),
        })}
        onClick={person.character.image ? flipImage : undefined}
      >
        <div
          className={classNames(styles.card, {
            [styles.flipped]: isFlipped,
          })}
        >
          <img
            src={buildMediaPath(person.actor.image)}
            alt={person.actor.name}
            onError={handleImageError(images.actorNotFound)}
            className={styles.image}
          />
          {person.character.image && (
            <img
              src={buildMediaPath(person.character.image)}
              alt={person.character.name}
              onError={handleImageError(images.characterNotFound)}
              className={classNames(styles.image, styles.characterSide)}
            />
          )}
        </div>
        {person.character.image && (
          <div className={styles.imagesIconContainer}>
            <ImagesIcon className={styles.imagesIcon} />
          </div>
        )}
      </div>
      <div className={styles.details}>
        <Link
          to="/"
          search={{ actorId: person.actor._id }}
          className={styles.name}
        >
          {person.actor.name}
        </Link>
        <p className={styles.characterName}>{person.character.name}</p>
      </div>
    </div>
  );
};

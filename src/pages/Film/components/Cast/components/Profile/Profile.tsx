import { CastType, IMAGE_FALLBACKS } from '@/common';
import classes from './Profile.module.css';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { buildLink } from '@/helpers';
import { handleImageError } from '@/utils';

type ProfileProps = {
  actor: CastType;
};

const Profile: FC<ProfileProps> = ({ actor }) => {
  return (
    <div className={classes.profile}>
      <div className={classes.photo}>
        <img
          src={actor.photoUrl}
          alt={actor.name}
          onError={(e) => handleImageError(e, IMAGE_FALLBACKS.noActorImage)}
        />
      </div>
      <div>
        <h3 className={classes.name}>
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

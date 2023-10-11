import { FilledActorData, IMAGE_FALLBACKS } from '@/common';
import classes from './Profile.module.css';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { buildLink, handleImageError } from '@/helpers';

type ProfileProps = {
  actor: FilledActorData;
};

const Profile: FC<ProfileProps> = ({ actor }) => {
  return (
    <div className={classes.profile}>
      <div className={classes.photo}>
        <img
          src={actor.photoUrl}
          alt={actor.name}
          onError={e =>
            handleImageError(
              e,
              IMAGE_FALLBACKS.noActorImage,
            )
          }
        />
      </div>
      <div>
        <h3 className={classes.name}>
          <Link
            to={`${buildLink(
              'actorId',
              actor.actorId,
            )}&actorName=${actor.name}`}
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

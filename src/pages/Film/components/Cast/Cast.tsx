import classes from './Cast.module.css';
import {
  FC,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import { useActorsContext } from '@/context/ActorsContext';
import { buildActorsData, buildLink } from '@/helpers';
import { IMAGE_FALLBACKS } from '@/constants';
import { Cast as CastType, FilledActorData } from '@/types';

const Cast: FC<{ cast: CastType[] }> = ({ cast }) => {
  const { actors } = useActorsContext();

  const [fullCastData, setFullCastData] = useState<
    FilledActorData[]
  >([]);

  const handleImageError = (
    event: SyntheticEvent<HTMLImageElement>,
    image: string,
  ) => {
    event.currentTarget.src = image;
  };

  useEffect(() => {
    if (actors.length) {
      const fullData = buildActorsData(actors, cast);
      setFullCastData(fullData);
    }
  }, [cast, actors]);

  return (
    <div className={classes.cast}>
      {fullCastData.length ? (
        fullCastData.map(actor => (
          <div
            key={actor.actorId}
            className={classes.actor}
          >
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
                <p className={classes.role}>
                  {actor.character.name}
                </p>
              </div>
            </div>
            {actor.character.imageUrl.length !== 0 && (
              <div className={classes.character}>
                <img
                  src={actor.character.imageUrl}
                  alt={actor.character.name}
                  onError={e =>
                    handleImageError(
                      e,
                      IMAGE_FALLBACKS.noCharacterImage,
                    )
                  }
                />
              </div>
            )}
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export { Cast };

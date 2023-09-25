import './cast.css';
import { FC, SyntheticEvent, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useActorsContext } from "@/context/ActorsContext";
import { buildActorsData, buildLink } from "@/heplers";
import { imageFallbacks } from '@/constants';
import { Cast as CastType, FilledActorData } from '@/types';

const Cast: FC<{ cast: CastType[] }> = ({ cast }) => {
  const { actors } = useActorsContext();
  const isCharacterImagesEnabled = import.meta.env.VITE_CHARACTER_IMAGES;  
  const [ fullCastData, setFullCastData ] = useState<FilledActorData[]>([]);

  const handleImageError = (
    event: SyntheticEvent<HTMLImageElement>,
    image: string,
  ) => {
    event.currentTarget.src = image;
  }

  useEffect(() => {
    if(actors.length) {
      const fullData = buildActorsData(actors, cast);
      setFullCastData(fullData);
    }
  }, [cast, actors]);

  return (
    <div className="cast">
      {fullCastData.length ? fullCastData.map((actor) => (
        <div key={actor.actorId} className="actor">
          <div className="actor__header">
            <div className="actor__photo">
              <img
                src={actor.photoUrl}
                alt={actor.name}
                onError={(e) => handleImageError(e, imageFallbacks.noActorImage)}
              />
            </div>
            <div className="actor__info">
              <h3 className="actor__name">
                <Link
                  to={`${buildLink('actorId', actor.actorId)}&actorName=${actor.name}`}
                >
                  {actor.name}
                </Link>
              </h3>
              <p className="actor__role">
                {actor.character.name}
              </p>
            </div>
          </div>
          {isCharacterImagesEnabled && isCharacterImagesEnabled !== 'disabled' && (
            <div className="actor__character">
              <img
                src={actor.character.imageUrl}
                alt={actor.character.name}
                onError={(e) => handleImageError(e, imageFallbacks.noCharacterImage)}
              />
            </div>
          )}
        </div>
      )) : (
        <div>
          Loading...
        </div>
      )}
    </div>
  );
};

export { Cast };
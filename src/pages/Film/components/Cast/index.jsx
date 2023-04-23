import './styles.css';
import { useActorsContext } from "@/context/actorsContext";
import { buildActorsData, buildLink } from "@/heplers";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { imageFallbacks } from '@/constants';

const Cast = ({ cast }) => {
  const { actors } = useActorsContext();
  const [ fullCastData, setFullCastData ] = useState([]);

  const handleImageError = (event, image) => {
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
                <Link to={buildLink('actor', actor.actorId)}>
                  {actor.name}
                </Link>
              </h3>
              <p className="actor__role">
                {actor.character.name}
              </p>
            </div>
          </div>
          <div className="actor__character">
            <img
              src={actor.character.imageUrl}
              alt={actor.character.name}
              onError={(e) => handleImageError(e, imageFallbacks.noCharacterImage)}
            />
          </div>
        </div>
      )) : (
        <div>
          Loading...
        </div>
      )}
    </div>
  );
};

export default Cast;
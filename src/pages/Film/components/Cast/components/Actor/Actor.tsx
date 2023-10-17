import classes from './Actor.module.css';
import { FC } from 'react';
import { Character } from '@/pages/Film/components/Cast/components/Character/Character';
import { Profile } from '@/pages/Film/components/Cast/components/Profile/Profile';
import { CastType } from '@/common';

type ActorProps = {
  actor: CastType;
};

const Actor: FC<ActorProps> = ({ actor }) => {
  return (
    <div className={classes.actor} id={actor.actorId}>
      <Profile actor={actor} />
      {actor.character.imageUrl.length !== 0 && (
        <Character
          character={actor.character}
          key={actor.character.imageUrl}
        />
      )}
    </div>
  );
};

export { Actor };

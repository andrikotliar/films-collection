import { FC } from 'react';
import { CastType } from '@/common';

import { Character } from '../Character/Character';
import { Profile } from '../Profile/Profile';

type Props = {
  actor: CastType;
};

const Actor: FC<Props> = ({ actor }) => {
  return (
    <div>
      <Profile actor={actor} />
      {actor.character.imageUrl?.length !== 0 && (
        <Character character={actor.character} key={actor.character.imageUrl} />
      )}
    </div>
  );
};

export { Actor };

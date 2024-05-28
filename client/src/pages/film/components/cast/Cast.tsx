import { FC, useContext } from 'react';
import { CastType } from '@/common/types';
import { DataGrid } from '@/components';
import { Actor } from './components';
import { FilmsContext } from '@/context';

type CastProps = {
  cast: CastType[];
};

const Cast: FC<CastProps> = ({ cast }) => {
  const { actors } = useContext(FilmsContext);

  if (!actors) {
    return null;
  }

  return (
    <DataGrid>
      {cast.map((actor) => {
        const actorExternalData = actors[actor.actorId];

        return (
          <Actor
            actor={actor}
            externalData={actorExternalData}
            key={actor.actorId}
          />
        );
      })}
    </DataGrid>
  );
};

export { Cast };

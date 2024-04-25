import { FC } from 'react';
import { CastType } from '@/common/types';
import { DataGrid } from '@/components';
import { Actor } from './components';
import { useDataContext } from '@/context';

type Props = {
  cast: CastType[];
};

const Cast: FC<Props> = ({ cast }) => {
  const { actors } = useDataContext();

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

import { FC } from 'react';
import { CastType } from '@/common';
import { Actor } from '@/pages/Film/components/Cast/components';
import { DataGrid } from '@/components';

type CastProps = {
  cast: CastType[];
};

const Cast: FC<CastProps> = ({ cast }) => {
  return (
    <DataGrid>
      {cast.map((actor) => (
        <Actor actor={actor} key={actor.actorId} />
      ))}
    </DataGrid>
  );
};

export { Cast };

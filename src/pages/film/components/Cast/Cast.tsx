import { FC } from 'react';
import { CastType } from '@/common/types';
import { Actor } from '@/pages/Film/components/Cast/components';
import { DataGrid } from '@/components';

type Props = {
  cast: CastType[];
};

const Cast: FC<Props> = ({ cast }) => {
  return (
    <DataGrid>
      {cast.map((actor) => (
        <Actor actor={actor} key={actor.actorId} />
      ))}
    </DataGrid>
  );
};

export { Cast };

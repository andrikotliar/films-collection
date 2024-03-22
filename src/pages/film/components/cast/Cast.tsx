import { FC } from 'react';
import { CastType } from '@/common/types';
import { DataGrid } from '@/components';
import { Actor } from './components';

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

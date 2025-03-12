import { FC } from 'react';
import { FilmCast } from '@/types';
import { Actor } from './components';
import { DataRow } from '@/ui';

type CastProps = {
  cast: FilmCast[];
};

export const Cast: FC<CastProps> = ({ cast }) => {
  return (
    <div>
      {cast.map((castItem) => (
        <DataRow key={castItem.person.id}>
          <Actor data={castItem} />
        </DataRow>
      ))}
    </div>
  );
};

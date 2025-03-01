import { FC } from 'react';
import { FilmCast } from '@/types';
import { Actor } from './components';

type CastProps = {
  cast: FilmCast[];
};

export const Cast: FC<CastProps> = ({ cast }) => {
  return (
    <div>
      {cast.map((castItem) => {
        return <Actor data={castItem} key={castItem.person.id} />;
      })}
    </div>
  );
};

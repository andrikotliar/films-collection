import { FC } from 'react';
import { CastType } from '@/types';
import { Actor } from './components';
import { ScrollableRow } from '@/components';

type CastProps = {
  cast: CastType[];
};

const Cast: FC<CastProps> = ({ cast }) => {
  return (
    <ScrollableRow>
      {cast.map((person) => {
        return <Actor person={person} key={person.actor._id} />;
      })}
    </ScrollableRow>
  );
};

export { Cast };

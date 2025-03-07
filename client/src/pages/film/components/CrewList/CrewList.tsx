import { FC } from 'react';
import { FilmCrew } from '@/types';
import { CrewItem } from './components';

type CrewListProps = {
  crew: FilmCrew[];
};

export const CrewList: FC<CrewListProps> = ({ crew }) => {
  return (
    <div>
      {crew.map((crewItem) => (
        <CrewItem crewItem={crewItem} key={crewItem.position} />
      ))}
    </div>
  );
};

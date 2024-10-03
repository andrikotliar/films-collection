import { FC } from 'react';
import { Crew } from '@/types';
import { CrewItem } from './components';

type CrewListProps = {
  crew: Crew[];
};

const CrewList: FC<CrewListProps> = ({ crew }) => {
  return (
    <div>
      {crew.map((crewItem) => (
        <CrewItem crewItem={crewItem} key={crewItem.role} />
      ))}
    </div>
  );
};

export { CrewList };

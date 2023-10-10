import { FC } from 'react';
import { Crew } from '@/common';
import { CrewItem } from './components';

const CrewList: FC<{ crew: Crew[] }> = ({ crew }) => {
  return (
    <div className="crew">
      {crew.map(crewItem => (
        <CrewItem crewItem={crewItem} key={crewItem.role} />
      ))}
    </div>
  );
};

export { CrewList };

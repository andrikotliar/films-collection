import { FC } from 'react';
import { Crew } from '@/common';
import { CrewItem } from './components';
import { DataArea } from '@/components';
import classes from './CrewList.module.css';

const CrewList: FC<{ crew: Crew[] }> = ({ crew }) => {
  return (
    <DataArea className={classes.crewList}>
      {crew.map((crewItem) => (
        <CrewItem crewItem={crewItem} key={crewItem.role} />
      ))}
    </DataArea>
  );
};

export { CrewList };

import { FC } from 'react';
import { Crew } from '@/common';
import { CrewItem } from './components';
import { DataArea } from '@/components';
import styles from './CrewList.module.css';

const CrewList: FC<{ crew: Crew[] }> = ({ crew }) => {
  return (
    <DataArea className={styles.crewList}>
      {crew.map((crewItem) => (
        <CrewItem crewItem={crewItem} key={crewItem.role} />
      ))}
    </DataArea>
  );
};

export { CrewList };

import { FC } from 'react';
import { Crew } from '@/types';
import { CrewItem } from './components';

import styles from './CrewList.module.css';

type CrewListProps = {
  crew: Crew[];
};

const CrewList: FC<CrewListProps> = ({ crew }) => {
  return (
    <div className={styles.crewList}>
      {crew.map((crewItem) => (
        <CrewItem crewItem={crewItem} key={crewItem.role} />
      ))}
    </div>
  );
};

export { CrewList };

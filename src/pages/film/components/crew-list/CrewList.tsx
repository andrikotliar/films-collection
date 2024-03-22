import { FC } from 'react';
import { Crew } from '@/common/types';
import { CrewItem } from './components';
import { DataArea } from '@/components';

import styles from './CrewList.module.css';

type Props = {
  crew: Crew[];
};

const CrewList: FC<Props> = ({ crew }) => {
  return (
    <DataArea className={styles.crewList}>
      {crew.map((crewItem) => (
        <CrewItem crewItem={crewItem} key={crewItem.role} />
      ))}
    </DataArea>
  );
};

export { CrewList };

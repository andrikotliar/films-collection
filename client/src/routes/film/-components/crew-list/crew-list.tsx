import { FC } from 'react';
import { FilmCrew } from '@/types';
import { CrewItem } from './components';
import styles from './crew-list.module.css';

type CrewListProps = {
  crew: FilmCrew[];
};

export const CrewList: FC<CrewListProps> = ({ crew }) => {
  return (
    <div className={styles.list}>
      {crew.map((crewItem) => (
        <CrewItem crewItem={crewItem} key={crewItem.position} />
      ))}
    </div>
  );
};

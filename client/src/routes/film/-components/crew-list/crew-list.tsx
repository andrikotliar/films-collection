import { FilmPerson } from '@/common';
import { CrewItem } from './components';
import styles from './crew-list.module.css';

type CrewListProps = {
  people: FilmPerson[];
};

export const CrewList = ({ people }: CrewListProps) => {
  const crew = people.filter((item) => item.role !== 'ACTOR');

  if (!crew.length) {
    return <div>Data not found</div>;
  }

  return (
    <div className={styles.list}>
      {crew.map((crewItem) => (
        <CrewItem crewItem={crewItem} key={crewItem.role} />
      ))}
    </div>
  );
};

import { FilmPerson } from '@/common';
import { RoleItem } from './components';
import styles from './crew-cast-list.module.css';

type CrewListProps = {
  people: FilmPerson[];
};

export const CrewCastList = ({ people }: CrewListProps) => {
  return (
    <div className={styles.list}>
      {people.map((personData) => (
        <RoleItem data={personData} key={personData.role} />
      ))}
    </div>
  );
};

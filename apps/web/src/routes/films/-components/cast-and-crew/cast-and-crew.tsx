import styles from './cast-and-crew.module.css';
import type { FilmPerson } from '~/shared';
import { RoleItem } from '~/routes/films/-components/cast-and-crew/components';

type CastAndCrewProps = {
  data: FilmPerson[];
};

export const CastAndCrew = ({ data }: CastAndCrewProps) => {
  return (
    <div className={styles.wrapper}>
      {data.map((personData) => (
        <RoleItem data={personData} key={personData.role} />
      ))}
    </div>
  );
};

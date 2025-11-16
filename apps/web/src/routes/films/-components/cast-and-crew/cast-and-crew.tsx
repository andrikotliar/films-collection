import styles from './styles.module.css';
import type { FilmPerson } from '~/shared';
import { RoleItem } from '~/routes/films/-components/cast-and-crew/components';

type Props = {
  data: FilmPerson[];
};

export const CastAndCrew = ({ data }: Props) => {
  return (
    <div className={styles.wrapper}>
      {data.map((personData) => (
        <RoleItem data={personData} key={personData.role} />
      ))}
    </div>
  );
};

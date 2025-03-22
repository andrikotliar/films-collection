import { FC } from 'react';
import { FilmCrew } from '@/types';
import { DataRow, RouterLink } from '@/ui';
import styles from './CrewItem.module.css';

type CrewItemProps = {
  crewItem: FilmCrew;
};

export const CrewItem: FC<CrewItemProps> = ({ crewItem }) => {
  return (
    <DataRow className={styles.crewItem}>
      <h3 className={styles.crewItemTitle}>{crewItem.position}:</h3>
      <ul className={styles.list}>
        {crewItem.people.map((person, idx) => (
          <li className={styles.person} key={idx}>
            <RouterLink
              to="/"
              search={{
                crewMemberPosition: crewItem.position,
                crewMemberId: person.id.toString(),
              }}
              className={styles.personLink}
            >
              {person.name}
            </RouterLink>
            {person.comment && (
              <span className={styles.comment}>({person.comment})</span>
            )}
          </li>
        ))}
      </ul>
    </DataRow>
  );
};

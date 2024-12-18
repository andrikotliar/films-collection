import { FC } from 'react';
import { Crew } from '@/types';
import { RouterLink } from '@/components';
import styles from './CrewItem.module.css';
import { buildQueryLink } from '@/helpers';

type CrewItemProps = {
  crewItem: Crew;
};

export const CrewItem: FC<CrewItemProps> = ({ crewItem }) => {
  return (
    <div className={styles.crewItem}>
      <h3 className={styles.crewItemTitle}>{crewItem.role}:</h3>
      <ul className={styles.list}>
        {crewItem.people.map((person, idx) => (
          <li className={styles.person} key={idx}>
            <RouterLink
              to={buildQueryLink({
                personRole: crewItem.role,
                personName: person.name,
              })}
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
    </div>
  );
};

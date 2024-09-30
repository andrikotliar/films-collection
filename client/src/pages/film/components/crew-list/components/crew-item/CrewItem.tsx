import { FC } from 'react';
import { Crew } from '@/types';
import { DataRow, RouterLink } from '@/components';
import styles from './CrewItem.module.css';
import { buildQueryLink } from '@/helpers';
import { personRoleTitles } from '@/titles';

type CrewItemProps = {
  crewItem: Crew;
};

const CrewItem: FC<CrewItemProps> = ({ crewItem }) => {
  return (
    <DataRow title={personRoleTitles[crewItem.role]}>
      <ul className={styles.list}>
        {crewItem.people.map((person, idx) => (
          <li className={styles.person} key={idx}>
            <RouterLink
              to={buildQueryLink({
                personRole: crewItem.role,
                personName: person.name,
              })}
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

export { CrewItem };

import { FC } from 'react';
import { Crew } from '@/common/types';
import { DataRow, RouterLink } from '@/components';
import styles from './CrewItem.module.css';
import { buildQueryLink } from '@/helpers';
import { personRoleToCrewTitle } from '@/common/maps';

type CrewItemProps = {
  crewItem: Crew;
};

const CrewItem: FC<CrewItemProps> = ({ crewItem }) => {
  return (
    <DataRow title={personRoleToCrewTitle[crewItem.role]}>
      <ul className={styles.list}>
        {crewItem.people.map((person, idx) => (
          <li className={styles.person} key={idx}>
            <RouterLink
              to={buildQueryLink('crew', {
                role: crewItem.role,
                name: person.name,
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

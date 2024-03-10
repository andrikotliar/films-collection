import styles from './CrewItem.module.css';
import { FC } from 'react';
import { buildLink } from '@/helpers';
import { Crew } from '@/common';
import { DataRow, RouterLink } from '@/components';

type Props = {
  crewItem: Crew;
};

const CrewItem: FC<Props> = ({ crewItem }) => {
  return (
    <DataRow title={crewItem.role}>
      <ul className={styles.list}>
        {crewItem.people.map((person, idx) => (
          <li className={styles.person} key={idx}>
            <RouterLink
              to={buildLink('crew', {
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

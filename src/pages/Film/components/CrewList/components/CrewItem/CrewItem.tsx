import styles from './CrewItem.module.css';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { buildLink } from '@/helpers';
import { Crew } from '@/common';
import { DataRow } from '@/components';

const CrewItem: FC<{ crewItem: Crew }> = ({ crewItem }) => {
  return (
    <DataRow title={crewItem.role}>
      <ul className={styles.list}>
        {crewItem.people.map((person, idx) => (
          <li className={styles.person} key={idx}>
            <Link
              to={buildLink('crew', {
                role: crewItem.role,
                name: person.name,
              })}
            >
              {person.name}
            </Link>
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

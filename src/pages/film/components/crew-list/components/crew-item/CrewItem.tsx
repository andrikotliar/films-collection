import { FC } from 'react';
import { Crew } from '@/common/types';
import { DataRow, RouterLink } from '@/components';
import styles from './CrewItem.module.css';
import { buildRouterLink } from '@/helpers';
import { roleToTitle } from '@/common/maps';

type Props = {
  crewItem: Crew;
};

const CrewItem: FC<Props> = ({ crewItem }) => {
  return (
    <DataRow title={roleToTitle[crewItem.role]}>
      <ul className={styles.list}>
        {crewItem.people.map((person, idx) => (
          <li className={styles.person} key={idx}>
            <RouterLink
              to={buildRouterLink('person', crewItem.role, person.name)}
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

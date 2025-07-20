import { FilmPerson } from '@/common';
import { RouterLink } from '@/components';
import styles from './crew-item.module.css';

type CrewItemProps = {
  crewItem: FilmPerson;
};

export const CrewItem = ({ crewItem }: CrewItemProps) => {
  return (
    <div className={styles.crewItem}>
      <h3 className={styles.crewItemTitle}>{crewItem.role}:</h3>
      <ul className={styles.list}>
        {crewItem.people.map((person, idx) => (
          <li className={styles.person} key={idx}>
            <RouterLink
              to="/"
              search={{
                crewMemberPosition: crewItem.role,
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
    </div>
  );
};

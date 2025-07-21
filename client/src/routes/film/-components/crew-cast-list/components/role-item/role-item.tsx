import { FilmPerson, personRoleToTitle } from '@/common';
import { RouterLink } from '@/components';
import styles from './role-item.module.css';
import classNames from 'classnames';

type RoleItemProps = {
  data: FilmPerson;
};

export const RoleItem = ({ data }: RoleItemProps) => {
  const isActorRole = data.role === 'ACTOR';

  return (
    <div
      className={classNames(styles.roleItem, {
        [styles.alignTop]: isActorRole,
      })}
    >
      <h3 className={styles.roleItemTitle}>{personRoleToTitle[data.role]}:</h3>
      <ul className={isActorRole ? styles.actors : styles.list}>
        {data.people.map((person, idx) => (
          <li className={styles.person} key={idx}>
            <div className={styles.personDetails}>
              <RouterLink
                to="/"
                search={{
                  personRole: data.role,
                  personId: person.id.toString(),
                }}
                className={styles.personLink}
              >
                {person.name}
              </RouterLink>
              {isActorRole && (
                <div>
                  <span className={styles.comment}>as</span> {person.details}
                </div>
              )}
            </div>
            {person.comment && (
              <span className={styles.comment}>({person.comment})</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

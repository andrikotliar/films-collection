import styles from './styles.module.css';
import clsx from 'clsx';
import { type FilmPerson, personRoleToTitle, RouterLink } from '~/lib';

type Props = {
  data: FilmPerson;
};

export const RoleItem = ({ data }: Props) => {
  const isActorRole = data.role === 'ACTOR';

  return (
    <div
      className={clsx(
        styles.role_item,
        isActorRole ? styles.role_item_actor : styles.role_item_default,
      )}
    >
      <h3 className={styles.label}>{personRoleToTitle[data.role]}:</h3>
      <ul
        className={clsx(
          styles.list_wrapper,
          isActorRole ? styles.list_wrapper_actor : styles.list_wrapper_default,
        )}
      >
        {data.people.map((person) => (
          <li key={person.id} className={styles.list_item}>
            <div className={styles.link_wrapper}>
              <RouterLink
                to="/"
                search={{
                  personRole: data.role,
                  personId: person.id.toString(),
                }}
              >
                {person.name}
              </RouterLink>
              {isActorRole && (
                <div>
                  <span className={styles.person_small_text}>as</span> {person.details}
                </div>
              )}
            </div>
            {person.comment && <span className={styles.person_small_text}>({person.comment})</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

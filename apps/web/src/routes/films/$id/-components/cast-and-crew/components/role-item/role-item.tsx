import styles from './role-item.module.css';
import clsx from 'clsx';
import { personRoleToTitle, RouterLink, type api, type ApiResponse } from '~/shared';

type RoleItemProps = {
  data: ApiResponse<typeof api.films.get>['castAndCrew'][number];
};

export const RoleItem = ({ data }: RoleItemProps) => {
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
                  personId: person.id,
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

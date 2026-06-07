import { PersonRole } from '@films-collection/shared';
import styles from './nominations.module.css';
import { RouterLink, type api, type ApiResponse } from '~/shared';

type NominationsProps = {
  data: ApiResponse<typeof api.films.getById>['awards'][number];
};

export const Nominations = ({ data }: NominationsProps) => {
  return (
    <div className={styles.nominations_wrapper}>
      <div className={styles.title}>Won {data.award.title} in nominations:</div>
      {data.nominations.map((nomination) => (
        <div className={styles.nomination} key={nomination.title}>
          <div>
            <div>{nomination.title}</div>
            {nomination.person && (
              <RouterLink
                to="/"
                search={{ personId: nomination.person.id, personRole: PersonRole.ACTOR }}
                className={styles.nominee_link}
              >
                {nomination.person.name}
              </RouterLink>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

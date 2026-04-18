import { PersonRole } from '@films-collection/shared';
import styles from './nomination.module.css';
import { RouterLink, type api, type ApiResponse } from '~/shared';

type NominationProps = {
  title: string;
  nominee: ApiResponse<
    typeof api.films.getById.exec
  >['awards'][number]['nominations'][number]['person'];
};

export const Nomination = ({ title, nominee }: NominationProps) => {
  return (
    <div className={styles.nomination}>
      <div>
        <div>{title}</div>
        {nominee && (
          <RouterLink
            to="/films"
            search={{ personId: nominee.id, personRole: PersonRole.ACTOR }}
            className={styles.nominee_link}
          >
            {nominee.name}
          </RouterLink>
        )}
      </div>
    </div>
  );
};

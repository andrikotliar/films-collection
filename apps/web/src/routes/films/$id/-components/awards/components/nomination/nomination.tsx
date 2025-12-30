import styles from './nomination.module.css';
import { RouterLink, type api, type ApiResponse } from '~/shared';

type NominationProps = {
  title: string;
  comment: string | null;
  nominee: ApiResponse<typeof api.films.get>['awards'][number]['nominations'][number]['person'];
};

export const Nomination = ({ title, comment, nominee }: NominationProps) => {
  return (
    <div className={styles.nomination}>
      <div>
        <div>{title}</div>
        {nominee && (
          <RouterLink to="/" search={{ personId: nominee.id }} className={styles.nominee_link}>
            {nominee.name}
          </RouterLink>
        )}
        {comment && <div className={styles.nomination_comment}>({comment})</div>}
      </div>
    </div>
  );
};

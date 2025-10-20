import styles from './styles.module.css';
import { type Person, RouterLink } from '~/common';

type NominationProps = {
  title: string;
  comment: string | null;
  nominee: Person | null;
};

export const Nomination = ({ title, comment, nominee }: NominationProps) => {
  return (
    <div className={styles.nomination}>
      <div>
        <div>{title}</div>
        {nominee && (
          <RouterLink
            to="/"
            search={{ actorId: String(nominee.id) }}
            className={styles.nominee_link}
          >
            {nominee.name}
          </RouterLink>
        )}
        {comment && <div className={styles.nomination_comment}>({comment})</div>}
      </div>
    </div>
  );
};

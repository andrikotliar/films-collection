import styles from './nomination.module.css';
import { RouterLink } from '@/components';
import { Person } from '@/types';

type NominationProps = {
  title: string;
  comment: string | null;
  nominee: Person | null;
};

export const Nomination = ({ title, comment, nominee }: NominationProps) => {
  return (
    <div className={styles.nomination}>
      <div className={styles.container}>
        <div className={styles.title}>{title}</div>
        {nominee && (
          <RouterLink
            to="/"
            search={{ actorId: String(nominee.id) }}
            className={styles.actor}
          >
            {nominee.name}
          </RouterLink>
        )}
        {comment && <div className={styles.comment}>({comment})</div>}
      </div>
    </div>
  );
};

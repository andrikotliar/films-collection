import { FC } from 'react';
import styles from './Nomination.module.css';
import { buildQueryLink } from '@/helpers';
import { RouterLink } from '@/ui';
import { Person } from '@/types';

type NominationProps = {
  title: string;
  comment: string | null;
  nominee: Person | null;
};

export const Nomination: FC<NominationProps> = ({
  title,
  comment,
  nominee,
}) => {
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

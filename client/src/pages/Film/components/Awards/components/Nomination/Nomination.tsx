import styles from './Nomination.module.css';
import { FC } from 'react';
import { RouterLink } from '@/ui';
import { Actor } from '@/types';

type NominationProps = {
  title: string;
  comment: string | null;
  nominee: Actor | null;
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
            search={{ actorId: nominee._id }}
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

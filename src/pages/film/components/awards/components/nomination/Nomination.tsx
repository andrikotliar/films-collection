import { FC } from 'react';
import styles from './Nomination.module.css';
import { buildQueryLink } from '@/helpers';
import { RouterLink } from '@/components';

type Nominee = {
  id: string;
  name: string;
};

type Props = {
  title: string;
  comment?: string;
  nominee: Nominee | null;
};

const Nomination: FC<Props> = ({ title, comment, nominee }) => {
  return (
    <div className={styles.nomination}>
      <div className={styles.container}>
        <div className={styles.title}>{title}</div>
        {nominee && (
          <RouterLink
            to={buildQueryLink('cast', nominee.id)}
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

export { Nomination };

import { FC } from 'react';
import styles from './Nomination.module.css';
import { Link } from 'react-router-dom';
import { buildQueryLink } from '@/helpers';
import { ActorsList } from '@/common/types';
import { RouterLink } from '@/components';

type Props = {
  title: string;
  comment?: string;
  actorId?: string;
  actors: ActorsList | null;
};

const Nomination: FC<Props> = ({ title, comment, actorId, actors }) => {
  return (
    <div className={styles.nomination}>
      <h4 className={styles.title}>{title}</h4>
      {actorId && actors && (
        <RouterLink
          to={buildQueryLink('cast', actorId)}
          className={styles.actorLink}
        >
          {actors[actorId].name}
        </RouterLink>
      )}
      {comment && <div className={styles.comment}>{comment}</div>}
    </div>
  );
};

export { Nomination };

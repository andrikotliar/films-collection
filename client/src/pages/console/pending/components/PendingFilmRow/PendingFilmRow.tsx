import styles from './PendingFilmRow.module.css';
import { PendingFilm } from '@/types';
import { Link } from '@tanstack/react-router';
import { FC } from 'react';
import { getPriorityTitle } from '@/helpers';
import { Priority } from '@/enums';
import { Status, StatusProps } from '@/components';

type PendingFilmRowProps = {
  data: PendingFilm;
};

const priorityToColor = {
  [Priority.HIGH]: 'red',
  [Priority.MEDIUM]: 'yellow',
  [Priority.LOW]: 'gray',
};

export const PendingFilmRow: FC<PendingFilmRowProps> = ({ data }) => {
  const rowPriority = getPriorityTitle(data.priority);
  const priorityColor = priorityToColor[rowPriority] as StatusProps['color'];

  return (
    <div className={styles.pendingFilmRow}>
      <Status color={priorityColor}>{rowPriority}</Status>
      <div className={styles.title}>{data.title}</div>
      <Link to="/console/manage" className={styles.createFilmButton}>
        Create
      </Link>
    </div>
  );
};

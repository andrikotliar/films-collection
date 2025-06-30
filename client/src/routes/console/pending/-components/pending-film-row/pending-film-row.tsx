import styles from './pending-film-row.module.css';
import { PendingFilm } from '@/types';
import { Link } from '@tanstack/react-router';
import { getPriorityTitle } from '@/helpers';
import { Status, StatusProps } from '@/components';
import { PencilIcon, SquarePlusIcon, Trash2Icon } from 'lucide-react';
import { priorityToColor } from '@/configs';
import { NEW_FILM_ID } from '@/constants';

type PendingFilmRowProps = {
  data: PendingFilm;
  onDelete: VoidFunction;
  onEdit: VoidFunction;
  isDeleteInProgress: boolean;
};

export const PendingFilmRow = ({
  data,
  onDelete,
  onEdit,
  isDeleteInProgress,
}: PendingFilmRowProps) => {
  const rowPriority = getPriorityTitle(data.priority);
  const priorityColor = priorityToColor[rowPriority] as StatusProps['color'];

  return (
    <div className={styles.pendingFilmRow}>
      <div className={styles.leftColumn}>
        <div className={styles.priorityBadge}>
          <Status color={priorityColor} title={rowPriority} />
        </div>
        <div className={styles.pendingFilmTitle}>{data.title}</div>
      </div>
      <div className={styles.rightColumn}>
        <Link
          to="/console/manage/$id"
          params={{ id: NEW_FILM_ID }}
          search={{ pendingFilmId: data.id.toString() }}
          className={styles.createFilmButton}
        >
          <SquarePlusIcon size={20} />
        </Link>
        <div className={styles.rowTools}>
          <button className={styles.toolButton} onClick={onEdit}>
            <PencilIcon size={20} />
          </button>
          <button
            className={styles.toolButton}
            onClick={onDelete}
            disabled={isDeleteInProgress}
          >
            <Trash2Icon size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

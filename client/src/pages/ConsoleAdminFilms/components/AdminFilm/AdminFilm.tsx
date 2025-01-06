import {
  FilmData,
  FilmsAdminListItem,
  StatusColor,
  UpdateFilmPayload,
} from '@/types';
import { FC } from 'react';
import styles from './AdminFilm.module.css';
import { Link } from '@tanstack/react-router';
import { EditIcon, SquareChartGanttIcon, TrashIcon } from 'lucide-react';
import { Status, Counter } from '@/ui';
import { PublishStatus } from '@/enums/publish-status';
import classNames from 'classnames';

type AdminFilmProps = {
  film: FilmsAdminListItem;
  onDelete: (id: string, title: string) => void;
  onUpdate: (payload: UpdateFilmPayload) => void;
  isDeleting?: boolean;
};

type PublishStatusColor = {
  [key in PublishStatus]: StatusColor;
};

const publishStatusColor: PublishStatusColor = {
  [PublishStatus.COMPLETED]: 'green',
  [PublishStatus.PARTIAL]: 'yellow',
  [PublishStatus.DRAFT]: 'red',
};

export const AdminFilm: FC<AdminFilmProps> = ({
  film,
  onDelete,
  onUpdate,
  isDeleting = false,
}) => {
  const handleUpdate = (prop: keyof FilmData) => (value: number) => {
    onUpdate({
      id: film._id,
      data: {
        [prop]: value,
      },
    });
  };

  return (
    <div className={styles.filmRow}>
      <div className={styles.titleRow}>
        <Status
          title={film.publishStatus}
          color={publishStatusColor[film.publishStatus]}
        />
        <div className={styles.title}>{film.title}</div>
      </div>
      <div className={styles.tools}>
        <div className={classNames(styles.column, styles.toolsBlock)}>
          <Link
            to="/film/$id"
            params={{ id: film._id }}
            className={styles.tool}
          >
            <SquareChartGanttIcon size={16} />
            <span>Details</span>
          </Link>
          <Link
            to="/console/manage/$id"
            params={{ id: film._id }}
            className={styles.tool}
          >
            <EditIcon size={14} />
            <span>Edit</span>
          </Link>
          <button
            className={styles.tool}
            onClick={() => onDelete(film._id, film.title)}
            disabled={isDeleting}
          >
            <TrashIcon size={14} />
            <span>Delete</span>
          </button>
        </div>
        <div className={styles.column}>
          <Counter
            defaultValue={film.rating}
            maxValue={3}
            label="Rating"
            onChange={handleUpdate('rating')}
          />
          <Counter
            defaultValue={film.watchCount}
            decrease={false}
            label="Watch count"
            onChange={handleUpdate('watchCount')}
          />
        </div>
      </div>
    </div>
  );
};

import { FilmsAdminListItem } from '@/types';
import { FC } from 'react';
import styles from './AdminFilm.module.css';
import { Link } from '@tanstack/react-router';
import { EditIcon, SquareChartGanttIcon } from 'lucide-react';
import classNames from 'classnames';

type AdminFilmProps = {
  film: FilmsAdminListItem;
};

export const AdminFilm: FC<AdminFilmProps> = ({ film }) => {
  return (
    <div
      className={classNames(styles.filmRow, {
        [styles.filmRowDraft]: film.draft,
      })}
    >
      <div className={styles.titleRow}>
        <div className={styles.title}>{film.title}</div>
        {film.draft && <div className={styles.draftMark}>Draft</div>}
      </div>
      <div className={styles.tools}>
        <Link
          to="/film/$filmId"
          params={{ filmId: String(film.id) }}
          className={styles.tool}
        >
          <SquareChartGanttIcon size={16} />
          <span>Details</span>
        </Link>
        {/* <Link
          to="/console/manage/$id"
          params={{ id: String(film.id) }}
          className={styles.tool}
        >
          <EditIcon size={14} />
          <span>Edit</span>
        </Link> */}
      </div>
    </div>
  );
};

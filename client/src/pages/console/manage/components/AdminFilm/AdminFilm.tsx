import { FilmsAdminListItem, StatusColor } from '@/types';
import { FC } from 'react';
import styles from './AdminFilm.module.css';
import { Link } from '@tanstack/react-router';
import { EditIcon, SquareChartGanttIcon, TrashIcon } from 'lucide-react';
import { Status, Counter } from '@/components';
import { PublishStatus } from '@/enums/publish-status';
import classNames from 'classnames';

type AdminFilmProps = {
  film: FilmsAdminListItem;
};

type PublishStatusColor = {
  [key in PublishStatus]: StatusColor;
};

const publishStatusColor: PublishStatusColor = {
  [PublishStatus.COMPLETED]: 'green',
  [PublishStatus.PARTIAL]: 'yellow',
  [PublishStatus.DRAFT]: 'red',
};

export const AdminFilm: FC<AdminFilmProps> = ({ film }) => {
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
          <Link to={`/film/${film._id}`} className={styles.toolLink}>
            <SquareChartGanttIcon size={16} />
            <span>Details</span>
          </Link>
          <Link to="/console/manage" className={styles.toolLink}>
            <EditIcon size={14} />
            <span>Edit</span>
          </Link>
          <Link to="/console/manage" className={styles.toolLink}>
            <TrashIcon size={14} />
            <span>Delete</span>
          </Link>
        </div>
        <div className={styles.column}>
          <Counter defaultValue={film.rating} maxValue={3} label="Rating" />
          <Counter
            defaultValue={film.watchCount}
            decrease={false}
            label="Watch count"
          />
        </div>
      </div>
    </div>
  );
};

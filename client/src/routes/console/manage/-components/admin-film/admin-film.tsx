import styles from './admin-film.module.css';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { FilmsAdminListItem } from '@/common';
import { Link } from '@tanstack/react-router';
import { Button, IconLink } from '@/components';

type AdminFilmProps = {
  film: FilmsAdminListItem;
};

export const AdminFilm = ({ film }: AdminFilmProps) => {
  return (
    <div className={styles.film}>
      <Link
        to="/film/$id"
        params={{ id: film.id.toString() }}
        className={styles.title}
      >
        {film.title}
      </Link>
      <div className={styles.tools}>
        <IconLink
          icon={<PencilIcon size={20} />}
          to="/console/manage/$id"
          params={{ id: film.id.toString() }}
        />
        <Button icon={<Trash2Icon size={20} />} variant="ghost" />
      </div>
    </div>
  );
};

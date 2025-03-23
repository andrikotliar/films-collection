import { Link } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';
import styles from './AddFilmLink.module.css';
import { NEW_FILM_ID } from '@/constants';

export const AddFilmLink = () => {
  return (
    <Link
      to={'/console/manage/$id'}
      params={{ id: NEW_FILM_ID }}
      className={styles.addFilmLink}
    >
      <PlusIcon size={18} />
      <span>Add new film</span>
    </Link>
  );
};

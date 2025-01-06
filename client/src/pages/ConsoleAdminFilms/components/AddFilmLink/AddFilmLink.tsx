import { Link } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';
import styles from './AddFilmLink.module.css';

export const AddFilmLink = () => {
  return (
    <Link
      to={'/console/manage/$id'}
      params={{ id: 'new' }}
      className={styles.addFilmLink}
    >
      <PlusIcon size={18} />
      <span>Add new film</span>
    </Link>
  );
};

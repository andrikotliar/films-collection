import { Link } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';
import styles from './AddFilmLink.module.css';

export const AddFilmLink = () => {
  return (
    <Link to="/console/manage" className={styles.addFilmLink}>
      <PlusIcon size={18} />
      <span>Add new film</span>
    </Link>
  );
};

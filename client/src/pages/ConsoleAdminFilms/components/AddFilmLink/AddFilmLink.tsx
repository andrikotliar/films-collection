import { Link } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';
import styles from './AddFilmLink.module.css';
import { FC } from 'react';

type AddFilmLinkProps = {
  id?: string;
};

export const AddFilmLink: FC<AddFilmLinkProps> = ({ id = 'new' }) => {
  // const id = 'new';
  return (
    <Link to={`/console/manage/${id}`} className={styles.addFilmLink}>
      <PlusIcon size={18} />
      <span>Add new film</span>
    </Link>
  );
};

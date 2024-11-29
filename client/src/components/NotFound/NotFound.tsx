import { FC } from 'react';
import { Link, useRouter } from '@tanstack/react-router';
import styles from './NotFound.module.css';

type NotFoundProps = {
  message?: string;
};

const DEFAULT_MESSAGE = "Page you're looking for doesn't exist.";

const NotFound: FC<NotFoundProps> = ({ message = DEFAULT_MESSAGE }) => {
  const { history } = useRouter();

  return (
    <div className={styles.notFound}>
      <div className={styles.container}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.description}>{message}</p>
        <div className={styles.actions}>
          <button className={styles.link} onClick={() => history.back()}>
            Back to previous page
          </button>
          <Link className={styles.link} to="/">
            Go to home page
          </Link>
        </div>
      </div>
    </div>
  );
};

export { NotFound };

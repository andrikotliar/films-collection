import { Link, useRouter } from '@tanstack/react-router';
import styles from './not-found.module.css';

type NotFoundProps = {
  title?: string;
  message?: string;
};

const DEFAULT_TITLE = '404';
const DEFAULT_MESSAGE = "Page you're looking for doesn't exist.";

export const NotFound = ({ title = DEFAULT_TITLE, message = DEFAULT_MESSAGE }: NotFoundProps) => {
  const { history } = useRouter();

  return (
    <div className={styles.not_found}>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
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

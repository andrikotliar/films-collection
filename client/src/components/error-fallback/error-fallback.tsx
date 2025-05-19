import { Link, useLocation } from '@tanstack/react-router';
import { FC } from 'react';
import styles from './error-fallback.module.css';

type ErrorFallbackProps = {
  message: string;
};

export const ErrorFallback: FC<ErrorFallbackProps> = ({ message }) => {
  const location = useLocation();

  return (
    <div className={styles.layout}>
      <div className={styles.board}>
        <h2>This page doesn't work</h2>
        <p className={styles.details}>{message}</p>
        {location.href !== '/' && (
          <Link to="/" className={styles.link}>
            Go to films list
          </Link>
        )}
      </div>
    </div>
  );
};

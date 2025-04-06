import { FormError } from '@/types';
import styles from './FieldError.module.css';
import { FC } from 'react';

type FieldErrorProps = {
  error?: FormError;
};

export const FieldError: FC<FieldErrorProps> = ({ error }) => {
  if (!error) {
    return null;
  }

  if (Array.isArray(error)) {
    return (
      <div className={styles.messagesWrapper}>
        {error.map((message) => (
          <span className={styles.errorMessage}>{message}</span>
        ))}
      </div>
    );
  }

  return (
    <div>
      <span className={styles.errorMessage}>{error}</span>
    </div>
  );
};

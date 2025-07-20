import styles from './field-error.module.css';
import { FormError } from '@/common';

type FieldErrorProps = {
  error?: FormError;
};

export const FieldError = ({ error }: FieldErrorProps) => {
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

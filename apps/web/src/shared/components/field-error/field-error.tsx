import styles from './field-error.module.css';
import { type FormError } from '~/shared';

type FieldErrorProps = {
  error?: FormError;
};

export const FieldError = ({ error }: FieldErrorProps) => {
  if (!error) {
    return null;
  }

  if (Array.isArray(error)) {
    return (
      <div className={styles.messages_wrapper}>
        {error.map((message) => (
          <span className={styles.error_message}>{message}</span>
        ))}
      </div>
    );
  }

  return (
    <div>
      <span className={styles.error_message}>{error}</span>
    </div>
  );
};

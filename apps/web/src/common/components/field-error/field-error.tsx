import styles from './styles.module.css';
import { type FormError } from '~/common';

type Props = {
  error?: FormError;
};

export const FieldError = ({ error }: Props) => {
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

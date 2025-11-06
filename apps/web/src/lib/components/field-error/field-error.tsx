import styles from './styles.module.css';
import { type FormError } from '~/lib';

type Props = {
  error?: FormError;
};

export const FieldError = ({ error }: Props) => {
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

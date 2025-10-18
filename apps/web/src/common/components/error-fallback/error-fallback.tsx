import styles from './error-fallback.module.css';

type ErrorFallbackProps = {
  message: string;
};

export const ErrorFallback = ({ message }: ErrorFallbackProps) => {
  return (
    <div className={styles.layout}>
      <h2 className={styles.title}>Cannot display the page</h2>
      <p className={styles.details}>Reason: {message}</p>
    </div>
  );
};

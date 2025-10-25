import styles from './styles.module.css';

type Props = {
  message: string;
};

export const ErrorFallback = ({ message }: Props) => {
  return (
    <div className={styles.layout}>
      <h2 className={styles.title}>Cannot display the page</h2>
      <p className={styles.details}>Reason: {message}</p>
    </div>
  );
};

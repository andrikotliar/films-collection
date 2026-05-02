import styles from './row.module.css';

type RowProps = {
  children?: React.ReactNode;
};

export const Row = ({ children }: RowProps) => {
  return <div className={styles.row}>{children}</div>;
};

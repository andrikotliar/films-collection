import styles from './column.module.css';

type ColumnProps = {
  children: React.ReactNode;
};

export const Column = ({ children }: ColumnProps) => {
  return <div className={styles.column}>{children}</div>;
};

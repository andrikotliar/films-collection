import styles from './scrollable-line.module.css';

export const ScrollableLine = ({ children }: React.PropsWithChildren) => {
  return <div className={styles.scrollable_line}>{children}</div>;
};

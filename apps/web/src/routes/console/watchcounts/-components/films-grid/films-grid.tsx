import styles from './films-grid.module.css';

export const FilmsGrid = ({ children }: React.PropsWithChildren) => {
  return <div className={styles.grid}>{children}</div>;
};

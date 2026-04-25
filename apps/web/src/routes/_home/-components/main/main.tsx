import styles from './main.module.css';

type MainProps = {
  children?: React.ReactNode;
};

export const Main = ({ children }: MainProps) => {
  return <main className={styles.root}>{children}</main>;
};

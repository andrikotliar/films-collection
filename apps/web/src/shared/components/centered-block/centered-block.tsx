import styles from './centered-block.module.css';

export const CenteredBlock = ({ children }: React.PropsWithChildren) => {
  return <div className={styles.centered_block}>{children}</div>;
};

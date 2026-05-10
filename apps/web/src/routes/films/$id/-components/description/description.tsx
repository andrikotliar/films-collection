import styles from './description.module.css';

type DescriptionProps = {
  children?: React.ReactNode;
};

export const Description = ({ children }: DescriptionProps) => {
  return <div className={styles.description}>{children}</div>;
};

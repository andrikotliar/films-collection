import styles from './description.module.css';

type DescriptionProps = {
  value: string;
};

export const Description = ({ value }: DescriptionProps) => {
  return <div className={styles.description}>{value}</div>;
};

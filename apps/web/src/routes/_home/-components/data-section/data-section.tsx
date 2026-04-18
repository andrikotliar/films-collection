import styles from './data-section.module.css';

type DataSectionProps = {
  title: string;
  children?: React.ReactNode;
};

export const DataSection = ({ title, children }: DataSectionProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

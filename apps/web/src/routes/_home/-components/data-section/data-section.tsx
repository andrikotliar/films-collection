import styles from './data-section.module.css';

type DataSectionProps = {
  title: string;
  children?: React.ReactNode;
};

export const DataSection = ({ title, children }: DataSectionProps) => {
  return (
    <div className={styles.data_section}>
      <div className={styles.title}>{title}</div>
      <div>{children}</div>
    </div>
  );
};

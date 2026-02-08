import styles from './section.module.css';

type SectionProps = {
  children: React.ReactNode;
  icon: React.ReactNode;
  title: string;
};

export const Section = ({ title, icon, children }: SectionProps) => {
  return (
    <div className={styles.section}>
      <h3 className={styles.section_title}>
        <div className={styles.icon}>{icon}</div>
        {title}
      </h3>
      {children}
    </div>
  );
};

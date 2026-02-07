import styles from './summary-block.module.css';

type SummaryBlockProps = {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

export const SummaryBlock = ({ label, icon, children }: SummaryBlockProps) => {
  return (
    <div className={styles.summary_block}>
      {label && (
        <div className={styles.label}>
          <div className={styles.icon}>{icon}</div> <span>{label}</span>
        </div>
      )}
      <div className={styles.row}>{children}</div>
    </div>
  );
};
